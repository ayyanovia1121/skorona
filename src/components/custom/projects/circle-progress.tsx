import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CircleProps {
  title: string;
  value: number;
  subtitle: string;
  variant?: "default" | "success" | "warning" | "inProgress";
}

const variantStyle = {
  default: "text-blue-500",
  success: "text-green-600",
  warning: "text-red-600",
  inProgress: "text-yellow-600",
};

const CircleProgress = ({ title, value, subtitle, variant }: CircleProps) => {
  return (
    <div className="flex flex-col items-center p-0">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </h3>
      <div className="relative w-24 h-28">
        <Progress
          value={value}
          className={cn(
            "h-20 w-20 rotate-[90deg]",
            variantStyle[variant || "default"] || ""
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(`text-xl font-semibold ${variantStyle[variant || "default"] }`)}>{`${Math.round(
            value || 0
          )}%`}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default CircleProgress;
