import LogoNexus from "./LogoNexus";

export default function NavbarHeader() {
  return (
    <div className="flex items-center">
      <LogoNexus width={50} height={26} className="mr-2" />
      <span className="text-white font-semibold">[Cluster Name]</span>
    </div>
  );
}