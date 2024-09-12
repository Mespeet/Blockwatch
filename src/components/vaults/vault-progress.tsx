import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface VaultProgressProps {
  vault: number;  // Replace 'any' with the actual type of 'vault' if known
  progress: number;  // Assuming 'progress' is a number. Adjust the type if different
}

export default function VaultProgress({vault, progress}: VaultProgressProps) {
  const _p = progress;
  const _v = vault;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vault {_v}</CardTitle>
        <CardDescription>Vault Fullness</CardDescription>
      </CardHeader>
      <CardContent>
      <div className="flex flex-col items-center">
          <div className="relative h-40 w-40">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                className="text-muted-foreground stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-primary stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray={`${_p * 2.51}, 251.2`}
                transform="rotate(-90 50 50)"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{_p}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
