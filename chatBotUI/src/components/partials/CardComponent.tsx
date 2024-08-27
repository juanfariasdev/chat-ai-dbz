import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";

export function CardComponent({ title, icon, onClick }: { title: string; icon: React.ReactNode; onClick: () => void }) {
    return (
      <Card className="flex flex-col justify-center items-center text-center gap-4 p-4 h-40 hover:bg-secondary hover:text-white cursor-pointer" onClick={onClick}>
        <CardContent>
          <CardTitle>{title}</CardTitle>
        </CardContent>
        <div className="w-full flex justify-end">
        <CardFooter className="flex items-end content-end">{icon}</CardFooter>
        </div>
      </Card>
    );
  }