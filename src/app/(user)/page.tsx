import React from "react";
import SelectFilter from "@/components/select/select-filter";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { DatePickerRange } from "@/components/date-picker/range";
import {
  KPICard,
  RatingDistributionChart,
  RatingTrendChart,
  ReviewVolumeChart,
  WordCloudCard,
  TopCommentsCard,
  SentimentSummaryChart,
  RatingByWorkspaceChart,
  MapboxChart
} from "@/components/dashboard";

export default function Dashboard() {
  return (
    <div className="">
      <div className="flex justify-end items-end flex-col gap-3 mb-3">
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Pilih Filter</Button></PopoverTrigger>
          <PopoverContent className="w-[500px] z-20 me-10 mt-5">
            <div className="bg-white p-8 rounded border border-gray-800 space-y-5">
              <label htmlFor="provinsi" className="text-sm font-medium">Kategori:</label>
              <SelectFilter />
              <div className="mt-2">
                <label htmlFor="provinsi" className="text-sm font-medium">Tanggal:</label>
                <DatePickerRange />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Mapbox Chart */}
        <div className="col-span-12 md:col-span-12">
          <MapboxChart />
        </div>

        {/* KPI Card */}
        <div className="col-span-12 md:col-span-3">
          <KPICard />
        </div>

        {/* Rating Distribution */}
        <div className="col-span-12 md:col-span-4">
          <RatingDistributionChart />
        </div>

        {/* Sentiment Summary */}
        <div className="col-span-12 md:col-span-5">
          <SentimentSummaryChart />
        </div>

        {/* Rating Trend */}
        <div className="col-span-12 md:col-span-6">
          <RatingTrendChart />
        </div>

        {/* Review Volume */}
        <div className="col-span-12 md:col-span-6">
          <ReviewVolumeChart />
        </div>

        {/* Rating by Workspace */}
        <div className="col-span-12 md:col-span-6">
          <RatingByWorkspaceChart />
        </div>

        {/* Word Cloud */}
        <div className="col-span-12 md:col-span-6">
          <WordCloudCard />
        </div>

        {/* Top Comments */}
        <div className="col-span-12 md:col-span-12">
          <TopCommentsCard />
        </div>


      </div>
    </div>
  );
}
