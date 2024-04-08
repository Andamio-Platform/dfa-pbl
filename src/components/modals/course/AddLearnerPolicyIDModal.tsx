"use client";

import React, { Suspense, useEffect, useState } from "react";
import Modal from "../Modal";
import { CourseReferenceUTxO, getConnectedTokenAsset } from "@andamiojs/core";
import { useFormik } from "formik";
import UpdateAssignmentModal from "./UpdateAssignmentModal";
import { AssetExtended } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { andamioConfig } from "../../../andamio/config";

const AddLearnerPolicyIDModal = (props: {
	selectedModuleUTxO: CourseReferenceUTxO;
}) => {
	const { connected, wallet } = useWallet();
	const [connectedCourseCreator, setConnectedCourseCreator] = useState<
		AssetExtended | undefined
	>(undefined);
	const [isModal1Open, setIsModal1Open] = useState(false);
	const [learnerCS, setLearnerCS] = useState<string | undefined>(undefined);

	useEffect(() => {
		async function getCourseCreator() {
			if (connected) {
				const _res = await getConnectedTokenAsset(
					wallet,
					andamioConfig.config.courseManagementTokens.courseCreatorPolicyID
				);
				if (_res) {
					setConnectedCourseCreator(_res);
				}
			}
		}

		if (connected) {
			getCourseCreator();
		}
	}, [connected, wallet]);

	const formik = useFormik({
		initialValues: {
			newCS: ""
		},
		onSubmit: (values) => {
			console.log(values);
			setLearnerCS(values.newCS);
			closeModal1();
		}
	});

	const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
		formik;

	const openModal1 = () => {
		setIsModal1Open(true);
	};

	const closeModal1 = () => {
		setIsModal1Open(false);
		setFieldValue("newCS", "", false); // Clear input when modal closes
	};

	useEffect(() => {
		if (isModal1Open) {
			// Reset form to initial state when modal opens
			formik.resetForm();
		}
	}, [isModal1Open]);

	return (
		<div>
			{connectedCourseCreator && (
				<>
					<button
						onClick={openModal1}
						className='btn bg-info text-primary rounded-lg drop-shadow hover:bg-primary hover:text-primary-content hover:scale-105 hover:border-solid hover:border-white'
						type='button'>
						Update the Assignment
					</button>
					<Modal
						isOpen={isModal1Open}
						closeModal={closeModal1}
						content={
							<div className='flex flex-col gap-3'>
								<h3>Enter the Policy ID of the new learner token</h3>
								<form onSubmit={handleSubmit} className='text-primary-content'>
									<input
										id='newCS'
										name='newCS'
										type='text'
										onChange={handleChange}
										value={values.newCS}
										className='rounded-lg border-2 bg-primary text-primary-content p-3 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
										placeholder='Enter Policy ID'
									/>
									{touched.newCS && errors.newCS ? (
										<div className='text-red-500'>{errors.newCS}</div>
									) : null}
									<button
										className='btn btn-info btn-wide rounded-lg drop-shadow hover:bg-primary hover:text-primary-content hover:scale-105 hover:border-solid hover:border-white ml-2'
										type='submit'>
										SUBMIT
									</button>
								</form>
								{learnerCS && (
									<UpdateAssignmentModal
										selectedModuleUTxO={props.selectedModuleUTxO}
										learnerCS={learnerCS}
									/>
								)}
							</div>
						}
					/>
				</>
			)}
		</div>
	);
};

export default AddLearnerPolicyIDModal;
