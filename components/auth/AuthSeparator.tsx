export default function AuthSeparator({ text }: { text: string }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <hr className="flex-grow border-gray-300" />
      <span className="text-sm text-gray-500">{text}</span>
      <hr className="flex-grow border-gray-300" />
    </div>
  );
}
