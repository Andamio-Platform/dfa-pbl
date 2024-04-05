"use client";

import { Suspense, useState } from "react";
import Loading from "../../../app/Loading";
import Modal from "../Modal";

import MintLearnerToken from "../../transactions/course/MintLearnerToken";

const MintLearnerTokenModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<button
				onClick={openModal}
				className='btn btn-success rounded-md drop-shadow text-black rounded-lg hover:scale-105 mx-auto'
				type='button'>
				Mint Your Learner Token
			</button>
			<Modal
				isOpen={isModalOpen}
				closeModal={closeModal}
				content={
					<Suspense fallback={<Loading />}>
						<MintLearnerToken closeModal={closeModal} />
					</Suspense>
				}
			/>
		</div>
	);
};

export default MintLearnerTokenModal;
