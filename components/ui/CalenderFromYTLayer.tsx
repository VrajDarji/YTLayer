"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";

interface CalendarFormYTLayerProps {
  initialDate: string | number | Date;
  endDate: string | number | Date;
  onDateSelect: (date: string) => void;
}

const formSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
});

const CalendarFormYTLayer: React.FC<CalendarFormYTLayerProps> = ({
  initialDate,
  endDate,
  onDateSelect,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date) => {
    form.setValue("date", date);
    const formattedDate = formatDate(date);
    setIsOpen(false);
    console.log(formattedDate);
    onDateSelect(formattedDate);
  };

  const formatDate = (date: Date) => {
    const year = format(date, "yyyy").toString();
    const month = format(date, "MM").toString();
    const day = format(date, "dd").toString();
    return `${year}-${month}-${day}`;
  };

  return (
    <Form {...form}>
      <form className="flex flex-row gap-x-4 items-center">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-x-2">
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] h-10 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto flex flex-col" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    // @ts-ignore
                    onSelect={handleDateSelect}
                    disabled={(data) =>
                      data < new Date(initialDate) || data > new Date(endDate)
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CalendarFormYTLayer;
