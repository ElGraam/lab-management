"use server";
import { AvailableSlot } from "@/types";

type responseData = {
  availableslot: AvailableSlot;
};

type responseData01 = {
  availableSlots: AvailableSlot[];
  totalCount: number;
};

export const createAvailableSlots = async (
  userId: string,
  dayOfWeek: number,  // 曜日
  startTime: Date,
  endTime: Date,
): Promise<responseData> => {
  const path = `${process.env.BACKEND_URL}/api/availableslots/create/${userId}`;
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dayOfWeek,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      }),
    });
    if (!res.ok) {
      throw new Error('Failed to create slot');
    }
    const data = await res.json();
    return { availableslot: data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAvailableSlots = async (
  userId: string,
  offset: number,
  limit: number,
): Promise<responseData01> => {
  const path = `${process.env.BACKEND_URL}/api/availableslots/${userId}?offset=${offset}&limit=${limit}`;
  try{
    const res = await fetch(path, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;  
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAvailableSlot = async (
  availableSlotId: string
): Promise<responseData> => {
  const path = `${process.env.BACKEND_URL}/api/availableslots/${availableSlotId}`;
  try {
    const res = await fetch(path, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return { availableslot: data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};