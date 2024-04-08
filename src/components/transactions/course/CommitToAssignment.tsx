import { useWallet } from "@meshsdk/react";
import {
	CourseReferenceUTxO,
	prepareCommitToAssignmentTx
} from "@andamiojs/core";
import { ChangeEvent, useState } from "react";
import { andamioConfig } from "../../../andamio/config";
import ErrorModal from "../../modals/ErrorModal";
import SuccessTxModal from "../../modals/SuccessTxModal";
import { truncateString } from "../../../utils/truncate";

const CommitToAssignment = (props: {
	selectedModuleUTxO: CourseReferenceUTxO;
	closeModal: () => void;
}) => {
	const [txHash, setTxHash] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [studentAssignmentInfo, setStudentAssignmentInfo] = useState("");
	const isValidUrl = (urlString: string): boolean => {
		const urlPattern = new RegExp(
			"^(https?:\\/\\/)?" + // validate protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
				"(\\#[-a-z\\d_]*)?$",
			"i"
		); // fragment locator
		return !!urlPattern.test(urlString);
	};

	const { wallet, connected } = useWallet();

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		if (name === "inputStudentAssignmentInfo") {
			setStudentAssignmentInfo(value);
		}
	};

	if (connected) {
		const handleClick = async () => {
			try {
				const COMMIT_TO_ASSIGNMENT_TX = await prepareCommitToAssignmentTx(
					wallet,
					andamioConfig,
					props.selectedModuleUTxO,
					studentAssignmentInfo
				);
				const res = await COMMIT_TO_ASSIGNMENT_TX.runTx();
				console.log(props.selectedModuleUTxO), console.log(res);
				setTxHash(res);
			} catch (error) {
				if (error instanceof Error) {
					setErrorMessage(error.message);
				} else {
					setErrorMessage(JSON.stringify(error));
				}
			}
		};
		return (
			<>
				{txHash !== "" ? (
					<SuccessTxModal txHash={txHash} closeModal={props.closeModal} />
				) : null}
				{errorMessage !== "" ? (
					<ErrorModal
						errorMessage={errorMessage}
						closeModal={props.closeModal}
					/>
				) : null}
				<div className='grid grid-cols-2 gap-5'>
					<div className='flex flex-col p-5'>
						<div className='mb-2 text-lg'>Enter Assignment Information</div>
						<div className='mb-2 text-base'>
							<form>
								<input
									type='text'
									name='inputStudentAssignmentInfo'
									placeholder='Assignment Evidence'
									onChange={handleInputChange}
									className='bg-primary w-full p-3 text-primary-content font-mono text-base rounded-lg drop-shadow'
								/>
							</form>
						</div>
						{isValidUrl(studentAssignmentInfo) ||
						(studentAssignmentInfo.length >= 8 &&
							studentAssignmentInfo.length <= 56) ? (
							<button
								className='btn btn-md btn-success rounded-lg drop-shadow p-2'
								onClick={handleClick}>
								Confirm Your Commitment to Module{" "}
								{props.selectedModuleUTxO.data?.moduleId}
							</button>
						) : (
							<div className='font-mono text-info text-sm uppercase'>
								String must be 8-56 characters
							</div>
						)}
					</div>
					<div className='p-5 text-base'>
						<div className='text-primary pb-3'>
							<span className='text-info'>Assignment:</span>{" "}
							{props.selectedModuleUTxO.data?.assignmentName}
						</div>
						<div className='text-neutral pb-3'>
							<span className='text-info'>Module Id:</span>{" "}
							{props.selectedModuleUTxO.data?.moduleId}
						</div>
						<div className='text-info'>Module Hash:</div>
						<pre
							className='text-neutral text-xs pb-3 tooltip'
							data-tip='learn more'>
							{truncateString(props.selectedModuleUTxO.data?.moduleHash, 40)}
						</pre>
					</div>
				</div>
			</>
		);
	}
	return <>Wallet not connected</>;
};

export default CommitToAssignment;
