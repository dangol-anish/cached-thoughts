"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TimerCard() {
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [time, setTime] = useState(5); // 25 minutes in seconds
  const intervalRef = useRef<number | null>(null);
  const [newWorkTime, setNewWorkTime] = useState(isBreak ? 300 : 1500);
  const [newBreakTime, setNewBreakTime] = useState(300);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current!);
            setIsBreak((prev) => !prev);
            setIsActive(false);
            return isBreak ? newBreakTime : newWorkTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && intervalRef.current !== null) {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isActive, isBreak, newWorkTime, newBreakTime]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(isBreak ? newBreakTime : newWorkTime);
    clearInterval(intervalRef.current!);
  };

  const handleToggle = (isBreakTimer: boolean) => {
    setIsBreak(isBreakTimer);
    setTime(isBreakTimer ? newBreakTime : newWorkTime);
    setIsActive(false);
    clearInterval(intervalRef.current!);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleSaveChanges = () => {
    setTime(isBreak ? newBreakTime : newWorkTime);
  };

  return (
    <Card className="w-[500px] h-[500px] flex flex-col">
      <CardHeader>
        <div className="flex flex-col justify-center w-full items-center gap-6">
          <CardTitle className="flex gap-2 items-center">
            <p>Pomodoro Timer</p>
          </CardTitle>
          <div className="flex justify-center gap-6">
            <Button
              onClick={() => handleToggle(false)}
              variant={!isBreak ? "default" : "outline"}
            >
              Work Time
            </Button>
            <Button
              onClick={() => handleToggle(true)}
              variant={isBreak ? "default" : "outline"}
            >
              Break Time
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-10 justify-center items-center text-9xl">
        <p>{formatTime(time)}</p>
      </CardContent>
      <CardFooter className="flex justify-center gap-6">
        <Button onClick={handleReset}>Reset</Button>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Set Time</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Set New Time</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="work-time" className="text-right">
                    Work Time
                  </Label>
                  <Input
                    id="work-time"
                    type="number"
                    className="col-span-3"
                    value={newWorkTime / 60}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      setNewWorkTime(
                        isNaN(value) || value < 0 || value > 100
                          ? newWorkTime
                          : value * 60
                      );
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="break-time" className="text-right">
                    Break Time
                  </Label>
                  <Input
                    id="break-time"
                    type="number"
                    className="col-span-3"
                    value={newBreakTime / 60}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      setNewBreakTime(
                        isNaN(value) || value < 0 || value > 100
                          ? newBreakTime
                          : value * 60
                      );
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleSaveChanges}>
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Button className="" onClick={handleStartPause}>
          {isActive ? "Pause" : "Start"}
        </Button>
        {/* <Button onClick={play}>Boop</Button> */}
      </CardFooter>
    </Card>
  );
}
