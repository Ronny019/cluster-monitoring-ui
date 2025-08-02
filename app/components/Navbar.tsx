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
			<ul className="flex-1 pl-0">
				{menuItems.map((item) => {
					const isActive = pathname === item.path;
					return (
						<li
							key={item.path}
							className={`mb-2 list-none rounded-md relative ${
								isActive ? "bg-[#13181E]" : ""
							}`}
						>
							<Link
								href={item.path}
								className={`flex items-center p-3 rounded-md transition-colors ${
									isActive
										? "bg-transparent"
										: "bg-[#242C35] hover:bg-gray-800"
								}`}
							>
								{/* Bullet point smaller and matches text color */}
								<span
									className={`mr-2 h-1.5 w-1.5 rounded-full`}
									style={{
										background: isActive ? "#C7CACC" : "#C7CACC",
									}}
								/>
								<span className="text-[#C7CACC]">{item.name}</span>
							</Link>
							{isActive && (
								<span
									className="absolute right-0 top-0 bottom-0 w-1 rounded-r bg-[#0098C5]"
									style={{ minHeight: "40px" }}
								/>
							)}
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
