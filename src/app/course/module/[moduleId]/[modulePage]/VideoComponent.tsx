"use client";

import React, { useState } from "react";
import YouTube from "react-youtube";
import styles from "./VideoComponent.module.css";

export default function VideoComponent({ videoUrl }: { videoUrl: string }) {
	// Handle video URLs
	const [play, setPlay] = useState(false);
	let youtubeId: string = "";

	// Extract YouTube ID
	if (videoUrl.length === 11) {
		youtubeId = videoUrl;
	} else {
		const match = videoUrl.match(
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
		);
		youtubeId = match ? match[1] : "error";
	}

	// YouTube Player Options
	const opts = {
		playerVars: {
			autoplay: play ? 1 : 0 // Autoplay the video on click
		}
	};

	// if (props.videoUrl.length == 11) {
	// 	youtubeId = props.videoUrl;
	// } else if (props.videoUrl.includes("https://www.youtube.com/watch?v=")) {
	// 	youtubeId = props.videoUrl.substring(32);
	// } else {
	// 	youtubeId = "error";
	// }

	return (
		<div className={styles.videoResponsive}>
			{youtubeId !== "error" ? (
				<>
					<YouTube videoId={youtubeId} opts={opts} />
					{!play && (
						<div className={styles.videoOverlay}>
							<button
								className={styles.videoPlayButton}
								onClick={() => setPlay(true)}>
								Play
							</button>
						</div>
					)}
				</>
			) : (
				<p>Invalid video URL</p>
			)}
		</div>
	);
}
