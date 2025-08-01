"use client";
import React, { useState, useEffect } from "react";

export default function Snapshot() {
  const [deleteOption, setDeleteOption] = useState<"never" | "auto">("never");
  const [lockedSnapshotsEnabled, setLockedSnapshotsEnabled] = useState(false);

  const isLockedSnapshotsDisabled = deleteOption === "never";

  // Uncheck Enable locked snapshots when Delete Each Snapshot is set to never
  useEffect(() => {
    if (deleteOption === "never" && lockedSnapshotsEnabled) {
      setLockedSnapshotsEnabled(false);
    }
  }, [deleteOption, lockedSnapshotsEnabled]);

  return (
    <div className="flex flex-col min-h-screen bg-[#1B222B] overflow-hidden">
      <div className="flex w-[70vw] max-w-5xl justify-between items-start pt-6 pl-6 pr-6">
        <div className="font-nunito font-light text-[21px] leading-[32px] tracking-[0px] align-bottom">
          Edit Snapshot Policy
        </div>
      </div>
      {/* Policy Name Input */}
      <div className="flex flex-col w-[70vw] max-w-5xl pl-6 pt-8 items-start">
        <label
          htmlFor="policyName"
          className="font-nunito text-[#C7CACC] text-[16px] mb-2"
        >
          Policy Name
        </label>
        <input
          id="policyName"
          type="text"
          placeholder="ProjectX_Daily"
          className="font-nunito text-[#C7CACC] bg-[#424B5380] border border-[#424B53] rounded-md px-4 py-2 placeholder-[#C7CACC] outline-none w-full"
        />
      </div>
      {/* Apply to Directory Input */}
      <div className="flex flex-col w-[70vw] max-w-5xl pl-6 pt-6 items-start">
        <label
          htmlFor="applyDirectory"
          className="font-nunito text-[#C7CACC] text-[16px] mb-2"
        >
          Apply to Directory
        </label>
        <div className="flex w-full">
          <div className="flex items-center px-3 bg-[#1B222C] border border-r-0 border-[#424B53] rounded-l-md text-[#C7CACC] font-nunito text-[16px]">
            /
          </div>
          <input
            id="applyDirectory"
            type="text"
            placeholder="Production/ProjectX"
            className="flex-1 font-nunito text-[#C7CACC] bg-[#424B5380] border border-l-0 border-[#424B53] rounded-r-md px-4 py-2 placeholder-[#C7CACC] outline-none"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          />
        </div>
      </div>
      {/* Schedule Section */}
      <div className="flex flex-col w-[70vw] max-w-5xl pl-6 pt-10">
        <div className="font-nunito text-[#C7CACC] text-[16px] mb-4">
          Run Policy on the Following Schedule
        </div>
        {/* Select Schedule Type */}
        <div className="flex flex-col md:flex-row md:items-center bg-[#242C35] rounded-t-md p-2">
          <label className="font-nunito text-[#C7CACC] text-[15px] mr-4 mb-2 md:mb-0" htmlFor="scheduleType">
            Select Schedule Type
          </label>
          <select
            id="scheduleType"
            className="bg-[#424B5380] border border-[#424B53] rounded-md px-3 py-2 text-[#C7CACC] font-nunito"
            defaultValue="Daily or Weekly"
          >
            <option>Daily or Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        {/* Set to Time Zone */}
        <div className="flex flex-col md:flex-row md:items-center bg-[#242C35] p-2">
          <label className="font-nunito text-[#C7CACC] text-[15px] mr-4 mb-2 md:mb-0">
            Set to Time Zone
          </label>
          <span className="font-nunito text-[#C7CACC] bg-transparent px-3 py-2">America/Los Angeles</span>
          <span
            className="ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-[#0298FF] text-black font-bold text-[15px] cursor-pointer"
            title="Time zone info"
          >
            ?
          </span>
        </div>
        {/* Take a Snapshot at */}
        <div className="flex flex-col md:flex-row md:items-center bg-[#242C35] p-2">
          <label className="font-nunito text-[#C7CACC] text-[15px] mr-4 mb-2 md:mb-0">
            Take a Snapshot at
          </label>
          <input
            type="number"
            min="0"
            max="23"
            defaultValue="07"
            placeholder="07"
            className="w-14 bg-[#424B5380] border border-[#424B53] rounded-md px-2 py-2 text-[#C7CACC] font-nunito text-center mr-2 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
            style={{ MozAppearance: 'textfield' }}
          />
          <span className="text-[#C7CACC] font-nunito mr-2">:</span>
          <input
            type="number"
            min="0"
            max="59"
            defaultValue="00"
            placeholder="00"
            className="w-14 bg-[#424B5380] border border-[#424B53] rounded-md px-2 py-2 text-[#C7CACC] font-nunito text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
            style={{ MozAppearance: 'textfield' }}
          />
        </div>
        {/* On the Following Day(s) */}
        <div className="flex flex-col md:flex-row md:items-center bg-[#242C35] p-2">
          <label className="font-nunito text-[#C7CACC] text-[15px] mr-4 mb-2 md:mb-0">
            On the Following Day(s)
          </label>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="checkbox"
                className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-1"
                style={{
                  accentColor: '#007ACC',
                  backgroundColor: '#007ACC',
                  color: '#fff'
                }}
              />
              Every day
            </label>
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="checkbox"
                className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-1"
                defaultChecked
                style={{
                  accentColor: '#007ACC',
                  backgroundColor: '#007ACC',
                  color: '#fff'
                }}
              />
              Mon
            </label>
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="checkbox"
                className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-1"
                defaultChecked
                style={{
                  accentColor: '#007ACC',
                  backgroundColor: '#007ACC',
                  color: '#fff'
                }}
              />
              Tue
            </label>
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="checkbox"
                className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-1"
                defaultChecked
                style={{
                  accentColor: '#007ACC',
                  backgroundColor: '#007ACC',
                  color: '#fff'
                }}
              />
              Wed
            </label>
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="checkbox"
                className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-1"
                defaultChecked
                style={{
                  accentColor: '#007ACC',
                  backgroundColor: '#007ACC',
                  color: '#fff'
                }}
              />
              Thur
            </label>
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="checkbox"
                className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-1"
                style={{
                  accentColor: '#007ACC',
                  backgroundColor: '#007ACC',
                  color: '#fff'
                }}
              />
              Fri
            </label>
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="checkbox"
                className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-1"
                style={{
                  accentColor: '#007ACC',
                  backgroundColor: '#007ACC',
                  color: '#fff'
                }}
              />
              Sat
            </label>
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="checkbox"
                className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-1"
                style={{
                  accentColor: '#007ACC',
                  backgroundColor: '#007ACC',
                  color: '#fff'
                }}
              />
              Sun
            </label>
          </div>
        </div>
        {/* Delete Each Snapshot */}
        <div className="flex flex-col md:flex-row md:items-center bg-[#242C35] rounded-b-md p-2">
          <label className="font-nunito text-[#C7CACC] text-[15px] mr-4 mb-2 md:mb-0">
            Delete Each Snapshot
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="radio"
                name="deleteSnapshot"
                className="accent-[#4FC3F7] mr-1"
                checked={deleteOption === "never"}
                onChange={() => setDeleteOption("never")}
              />
              Never
            </label>
            <label className="flex items-center font-nunito text-[#C7CACC]">
              <input
                type="radio"
                name="deleteSnapshot"
                className="accent-[#4FC3F7] mr-1"
                checked={deleteOption === "auto"}
                onChange={() => setDeleteOption("auto")}
              />
              Automatically after
              <input
                type="number"
                min="1"
                defaultValue="14"
                className="w-14 bg-[#424B5380] border border-[#424B53] rounded-md px-2 py-1 mx-2 text-[#C7CACC] font-nunito text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
                style={{ MozAppearance: 'textfield' }}
                disabled={deleteOption !== "auto"}
              />
              <select
                className="bg-[#424B5380] border border-[#424B53] rounded-md px-2 py-1 text-[#C7CACC] font-nunito"
                disabled={deleteOption !== "auto"}
              >
                <option>day(s)</option>
                <option>week(s)</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      {/* Snapshot Locking Section */}
      <div className="flex flex-col w-[70vw] max-w-5xl pl-6 pt-10">
        <div className="font-nunito text-[#C7CACC] text-[16px]">
          Snapshot Locking
        </div>
        <div className="font-nunito text-[#C7CACC] text-[14px] mb-4 mt-1">
          Locked snapshots cannot be deleted before the deletion schedule expires. For this feature to be available, snapshots must&nbsp;
          be set to automatically delete.
        </div>
        <div className="flex flex-col gap-8 mb-8">
          <label className="flex items-center font-nunito text-[#C7CACC] text-[15px]">
            <input
              type="checkbox"
              className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-2"
              style={{
                accentColor: '#007ACC',
                backgroundColor: '#007ACC',
                color: '#fff'
              }}
              disabled={isLockedSnapshotsDisabled}
              checked={lockedSnapshotsEnabled}
              onChange={e => setLockedSnapshotsEnabled(e.target.checked)}
            />
            Enable locked snapshots
          </label>
          <label className="flex items-center font-nunito text-[#C7CACC] text-[15px]">
            <input
              type="checkbox"
              className="accent-[#007ACC] checked:bg-[#007ACC] checked:text-white mr-2"
              defaultChecked
              style={{
                accentColor: '#007ACC',
                backgroundColor: '#007ACC',
                color: '#fff'
              }}
            />
            Enable policy
          </label>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-[#0298FF] hover:bg-[#007ACC] text-white font-nunito px-5 py-2 rounded-md text-[15px] font-normal transition-colors"
            type="button"
          >
            Save Policy
          </button>
          <button
            className="text-[#0298FF] hover:underline font-nunito text-[15px] font-normal px-2 py-2 rounded-md"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}