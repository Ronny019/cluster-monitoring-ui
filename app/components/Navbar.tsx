"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarHeader from "./NavbarHeader";
import Divider from "./Divider";
import InfoIcon from "./InfoIcon";
import ChevronDownIcon from "./ChevronDownIcon";

const menuItems = [
	{ name: "Performance Metrics", path: "/performance" },
	{ name: "Edit Snapshot Policy", path: "/snapshot" },
];

export default function Navbar() {
	const pathname = usePathname();

	return (
		<div className="min-h-screen h-full w-64 bg-[#242C35] text-white flex flex-col p-4 gap-2 sticky top-0">
			<NavbarHeader />
			<Divider />
			<ul className="list-disc flex-1">
				{menuItems.map((item) => {
					const isActive = pathname === item.path;
					return (
						<li key={item.path} className={"mb-2"}>
							<Link
								href={item.path}
								className={`block p-3 rounded-md transition-colors ${
									isActive
										? "bg-[#13181E]"
										: "bg-[#242C35] hover:bg-gray-800"
								}`}
							>
								{item.name}
							</Link>
						</li>
					);
				})}
			</ul>
			<Divider />
			<div className="flex items-center mt-2">
				<InfoIcon className="h-5 w-5 text-gray-400" />
				<span className="text-sm text-gray-300 ml-2">AD\user</span>
				<div className="flex-1" />
				<ChevronDownIcon className="h-7 w-7 text-gray-400" />
			</div>
		</div>
	);
}
