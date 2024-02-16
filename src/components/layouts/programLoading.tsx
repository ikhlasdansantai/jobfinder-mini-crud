export default function ProgramLoading() {
  return (
    <div className="card animate-pulse bg-[#1f273a] rounded-lg p-4">
      <h2 className="text-lg bg-[#15182b] animate-pulse w-[55%] h-[14px] mb-1"></h2>
      <p className="text-xs bg-[#15182b] animate-pulse w-[10%] h-[7px]"></p>
      <ul className="buttons text-xs rounded-md flex gap-2 mt-4">
        <li className="bg-[#15182b] py-3 px-8 animate-pulse"></li>
        <li className="bg-[#15182b] py-3 px-8 animate-pulse"></li>
      </ul>
    </div>
  );
}
