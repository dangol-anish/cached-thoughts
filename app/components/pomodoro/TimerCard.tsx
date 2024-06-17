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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export function TimerCard() {
  return (
    <>
      <Card className="w-[500px] h-[500px] flex flex-col">
        <CardHeader>
          <div className="flex  justify-center gap-4">
            <Button variant="outline">Work Timer</Button>
            <Button variant="outline">Break Timer</Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-10 justify-center items-center text-9xl">
          <p>25:00</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline">Stop</Button>
        </CardFooter>
      </Card>
    </>
  );
}
