"use client"
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React from 'react'
import { File, PlusCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddProductModalContext } from 'app/context/ContextProvider';
import { useRouter } from 'next/navigation';
const DashboardOptions = () => {
  const { ProductModalOpen, SetProductModalOpen } = useAddProductModalContext();
  const router = useRouter()
  return (
    <div className="">
        {/* <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList> */}
        <div className="ml-auto flex items-center  gap-2">
          <Button
          onClick={()=>router.push('/?revalidate=0')}
          size="sm" variant="outline" className="h-8 gap-1">
            <RefreshCcw className="h-3.5 w-3.5" />
            <span className=" sm:whitespace-nowrap">
              Refresh
            </span>
          </Button>
          <Button onClick={()=>SetProductModalOpen(true)} size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className=" sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
  )
}

export default DashboardOptions