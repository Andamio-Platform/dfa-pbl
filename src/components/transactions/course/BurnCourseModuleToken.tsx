import { useWallet } from "@meshsdk/react";
import {
	CourseReferenceUTxO,
	prepareBurnCourseModuleTokenTx
} from "@andamiojs/core";
import { useState } from "react";
import { andamioConfig } from "../../../andamio/config";
import ErrorModal from "../../modals/ErrorModal";
import SuccessTxModal from "../../modals/SuccessTxModal";

const BurnCourseModuleToken = (props: {
	selectedModuleUTxO: CourseReferenceUTxO;
	closeModal: () => void;
}) => {
	const [txHash, setTxHash] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const { wallet, connected } = useWallet();
	if (connected) {
		const handleClick = async () => {
			try {
				const BURN_COURSE_MODULE_TOKEN = await prepareBurnCourseModuleTokenTx(
					wallet,
					andamioConfig,
					props.selectedModuleUTxO
				);
				const res = await BURN_COURSE_MODULE_TOKEN.runTx();

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
				<div className='flex flex-col py-10 items-center bg-gradient-br w-max p-24'>
					<div className='font-extrabold mb-4 text-xl'>
						You will burn this module token
					</div>

					<button
						onClick={handleClick}
						className='btn btn-error p-3 rounded-lg drop-shadow hover:bg-primary hover:text-primary-content hover:scale-105'
						type='button'>
						Confirm Burn
					</button>
				</div>
			</>
		);
	}
	return <>Wallet not connected</>;
};

export default BurnCourseModuleToken;
