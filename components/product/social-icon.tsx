export default function SocialIcons() {
  return (
    <div className="absolute bottom-8 right-8 space-y-4">
      <button
        className="w-8 h-8 bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
        aria-label="Facebook"
      >
        <span className="text-xs font-bold">f</span>
      </button>
      <button
        className="w-8 h-8 bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
        aria-label="Instagram"
      >
        <span className="text-xs font-bold">@</span>
      </button>
    </div>
  );
}
