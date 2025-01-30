"use client"
import React, { useEffect, useState } from 'react'


interface Metric {
    id: string;
    label: string;
    value: string | number;
    type: "sales" | "traffic" | "engagement";
  }


const AnalyticsClient = () => {
    const [metrics, setMetrics] = useState<Metric[]>([]);

    useEffect(() => {

      const fetchedMetrics: Metric[] = [
        { id: "totalSales", label: "Total Sales", value: 1523, type: "sales" },
        { id: "uniqueVisitors", label: "Unique Visitors", value: 8421, type: "traffic" },
        { id: "conversionRate", label: "Conversion Rate", value: "2.4%", type: "engagement" },
        { id: "averageOrderValue", label: "Average Order Value", value: "$56.23", type: "sales" },
        { id: "bounceRate", label: "Bounce Rate", value: "45%", type: "traffic" },
      ];
      setMetrics(fetchedMetrics);
    }, []);
  
    const renderMetricCard = (metric: Metric) => (
      <div key={metric.id} className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700">{metric.label}</h3>
        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
      </div>
    );
  
    return (
      <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">E-commerce Analytics</h1>
  
        <section>
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Sales Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.filter((metric) => metric.type === "sales").map(renderMetricCard)}
          </div>
        </section>
  
        <section>
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Traffic Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.filter((metric) => metric.type === "traffic").map(renderMetricCard)}
          </div>
        </section>
  
        <section>
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Engagement Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.filter((metric) => metric.type === "engagement").map(renderMetricCard)}
          </div>
        </section>
      </div>
    );
}

export default AnalyticsClient