"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";

export function TimerCard() {
  return (
    <>
      <Card className="w-[500px] h-[500px] flex flex-col">
        <CardHeader>
          <div className="flex flex-col justify-center w-full items-center gap-6">
            <CardTitle className="flex gap-2">
              <p>Pomodoro Timer</p>
              <EllipsisVertical />
            </CardTitle>
            <div className="flex  justify-center gap-6">
              <Button>Work Timer</Button>
              <Button variant="outline">Break Timer</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-10 justify-center items-center text-9xl">
          <p>25:00</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="text-[20px] p-6">Start</Button>
        </CardFooter>
      </Card>
    </>
  );
}
