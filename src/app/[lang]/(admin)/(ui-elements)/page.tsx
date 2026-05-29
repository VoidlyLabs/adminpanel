import type { Metadata } from 'next';
import { EcommerceMetrics } from '@/components/ecommerce/EcommerceMetrics';
import React from 'react';
import MonthlyTarget from '@/components/ecommerce/MonthlyTarget';
import MonthlySalesChart from '@/components/ecommerce/MonthlySalesChart';
import StatisticsChart from '@/components/ecommerce/StatisticsChart';
import RecentOrders from '@/components/ecommerce/RecentOrders';
import DemographicCard from '@/components/ecommerce/DemographicCard';
import GridShape from '@/components/common/GridShape';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
};

export default function Ecommerce() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center p-6 h-[80dvh] overflow-hidden z-1">
        <GridShape />
        <div className={'flex justify-center h-full w-full'}>
          <div
            className={
              'text-center w-full flex flex-col items-center justify-center gap-3'
            }
          >
            <h1 className={'text-2xl sm:text-3xl font-bold'}>
              There's nothing here yet
            </h1>
            <h3 className={'text-zinc-400 text-sm sm:text-2xl'}>
              But you can choose page in the sidebar
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
