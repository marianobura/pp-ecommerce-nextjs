import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-dvh w-dvw">
      <div className="size-full flex items-center justify-center text-esona">
        <Loader size={48} className="animate-spin" />  
      </div>
    </div>
  )
}