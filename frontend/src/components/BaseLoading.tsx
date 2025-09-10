import { Loader } from 'lucide-react';

export default function BaseLoading() {
  return (
    <div className="text-esona flex min-h-dvh grow items-center justify-center">
      <Loader size={48} className="animate-spin" />
    </div>
  );
}
