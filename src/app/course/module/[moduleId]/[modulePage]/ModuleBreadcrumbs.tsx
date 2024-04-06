import Link from "next/link";
import { getModuleTitle } from "../../../../../lib/course";
import { LMSObjectMetadata } from "@andamiojs/core";
import { andamioConfig } from "../../../../../andamio/config";

export default function ModuleBreadcrumbs({
	moduleId,
	frontmatter
}: {
	moduleId: string | undefined;
	frontmatter: LMSObjectMetadata | undefined;
}) {
	return (
		<div className='card bg-secondary text-secondary-content rounded-lg drop-shadow px-4 py-2 font-mono'>
			<div className='breadcrumbs'>
				<ul>
					<li className='btn btn-info rounded-lg drop-shadow ml-5 hover:scale-105'>
						<Link href='/course' className='text-sm uppercase'>
							{andamioConfig.title}
						</Link>
					</li>
					{moduleId && frontmatter && (
						<>
							<li
								className={`btn rounded-lg drop-shadow ml-5 hover:scale-105 ${
									frontmatter.type == "ModuleOverview"
										? "btn-success"
										: "btn-info"
								}`}>
								<Link
									href={`/course/module/${moduleId}`}
									className='text-sm uppercase'>
									Module {moduleId}: {getModuleTitle({ moduleId })}
								</Link>
							</li>
							{frontmatter.type != "ModuleOverview" && (
								<li className='btn btn-success rounded-lg drop-shadow ml-8 hover:scale-105'>
									<Link href={`#`} className='text-sm uppercase'>
										{frontmatter.title}
									</Link>
								</li>
							)}
						</>
					)}
				</ul>
			</div>
		</div>
	);
}
