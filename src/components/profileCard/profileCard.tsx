import { ReactElement } from "react";

interface Props {
  label: string;
  content: string;
  icon: ReactElement;
}

function ProfileCard({label, content, icon}:Props) {
  return (
    <div className="border p-2 rounded-md">
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      <div className="text-xs font-bold">{content}</div>
    </div>
  )
}

export default ProfileCard