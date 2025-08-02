"use client";
import React, { useState, useEffect } from "react";
import { useCluster } from "../context/ClusterContext"; // adjust path as needed
import axios from "axios";

export default function Snapshot() {
  const { selectedCluster } = useCluster();
  const [snapshotData, setSnapshotData] = useState<any>(null);

  // State variables for each form component
  const [policyName, setPolicyName] = useState("");
  const [applyDirectory, setApplyDirectory] = useState("");
  const [scheduleType, setScheduleType] = useState("Daily or Weekly");
  const [timeZone, setTimeZone] = useState("America/Los Angeles");
  const [snapshotHour, setSnapshotHour] = useState("07");
  const [snapshotMinute, setSnapshotMinute] = useState("00");

  // Checkbox state for "On the Following Day(s)"
  const [everyDayChecked, setEveryDayChecked] = useState(false);
  const [monChecked, setMonChecked] = useState(true);
  const [tueChecked, setTueChecked] = useState(true);
  const [wedChecked, setWedChecked] = useState(true);
  const [thurChecked, setThurChecked] = useState(true);
  const [friChecked, setFriChecked] = useState(false);
  const [satChecked, setSatChecked] = useState(false);
  const [sunChecked, setSunChecked] = useState(false);

  // Delete option and related state
  const [deleteOption, setDeleteOption] = useState<"never" | "auto">("never");
  const [deleteAfter, setDeleteAfter] = useState("14");
  const [deleteAfterUnit, setDeleteAfterUnit] = useState("day(s)");

  // Snapshot locking and policy enable
  const [lockedSnapshotsEnabled, setLockedSnapshotsEnabled] = useState(false);
  const [enablePolicy, setEnablePolicy] = useState(true);

  useEffect(() => {
    if (!selectedCluster) return;
    axios
      .get(`http://127.0.0.1:3333/data/snapshot?cluster_id=${selectedCluster}`)
      .then(res => {
        const data = res.data[0];
        setSnapshotData(data);

        // Set state variables from fetched data (with fallback/defaults)
        setPolicyName(data?.policyName || "");
        setApplyDirectory(data?.applyDirectory || "");
        setScheduleType(data?.scheduleType || "Daily or Weekly");
        setTimeZone(data?.timeZone || "America/Los Angeles");
        setSnapshotHour(data?.snapshotHour || "07");
        setSnapshotMinute(data?.snapshotMinute || "00");

        setEveryDayChecked(data?.days?.everyDay || false);
        setMonChecked(data?.days?.mon ?? false);
        setTueChecked(data?.days?.tue ?? false);
        setWedChecked(data?.days?.wed ?? false);
        setThurChecked(data?.days?.thur ?? false);
        setFriChecked(data?.days?.fri ?? false);
        setSatChecked(data?.days?.sat ?? false);
        setSunChecked(data?.days?.sun ?? false);

        setDeleteOption(data?.deleteOption || "never");
        setDeleteAfter(data?.deleteAfter || "14");
        setDeleteAfterUnit(data?.deleteAfterUnit || "day(s)");

        setLockedSnapshotsEnabled(data?.lockedSnapshotsEnabled || false);
        setEnablePolicy(data?.enablePolicy ?? true);
      })
      .catch(err => {
        setSnapshotData(null);
        console.error("Error fetching snapshot data:", err);
      });
  }, [selectedCluster]);

  const isLockedSnapshotsDisabled = deleteOption === "never";

  // Uncheck Enable locked snapshots when Delete Each Snapshot is set to never
  useEffect(() => {
    if (deleteOption === "never" && lockedSnapshotsEnabled) {
      setLockedSnapshotsEnabled(false);
    }
  }, [deleteOption, lockedSnapshotsEnabled]);

  // Sync "Every day" with all days
  useEffect(() => {
    if (monChecked && tueChecked && wedChecked && thurChecked && friChecked && satChecked && sunChecked) {
      setEveryDayChecked(true);
    } else {
      setEveryDayChecked(false);
    }
  }, [monChecked, tueChecked, wedChecked, thurChecked, friChecked, satChecked, sunChecked]);

  // When "Every day" is checked, check all days
  const handleEveryDayChange = (checked: boolean) => {
    setEveryDayChecked(checked);
    setMonChecked(checked);
    setTueChecked(checked);
    setWedChecked(checked);
    setThurChecked(checked);
    setFriChecked(checked);
    setSatChecked(checked);
    setSunChecked(checked);
  };

  // --- Begin form structure ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Build the JSON body from current state
    const body = {
      cluster_id: selectedCluster,
      cluster_name: snapshotData?.cluster_name || "",
      policyName,
      applyDirectory,
      scheduleType,
      timeZone,
      snapshotHour,
      snapshotMinute,
      days: {
        everyDay: everyDayChecked,
        mon: monChecked,
        tue: tueChecked,
        wed: wedChecked,
        thur: thurChecked,
        fri: friChecked,
        sat: satChecked,
        sun: sunChecked,
      },
      deleteOption,
      deleteAfter,
      deleteAfterUnit,
      lockedSnapshotsEnabled,
      enablePolicy,
    };

    try {
      await axios.put("http://127.0.0.1:3333/data/snapshot", body);
      // Optionally, show a success message or refetch data
      // alert("Snapshot policy saved!");
    } catch (err) {
      console.error("Error saving snapshot policy:", err);
      // Optionally, show an error message
    }
  };

  // Add this helper function inside your component:
  const resetFormToSnapshot = (data: any) => {
    setPolicyName(data?.policyName || "");
    setApplyDirectory(data?.applyDirectory || "");
    setScheduleType(data?.scheduleType || "Daily or Weekly");
    setTimeZone(data?.timeZone || "America/Los Angeles");
    setSnapshotHour(data?.snapshotHour || "07");
    setSnapshotMinute(data?.snapshotMinute || "00");

    setEveryDayChecked(data?.days?.everyDay || false);
    setMonChecked(data?.days?.mon ?? false);
    setTueChecked(data?.days?.tue ?? false);
    setWedChecked(data?.days?.wed ?? false);
    setThurChecked(data?.days?.thur ?? false);
    setFriChecked(data?.days?.fri ?? false);
    setSatChecked(data?.days?.sat ?? false);
    setSunChecked(data?.days?.sun ?? false);

    setDeleteOption(data?.deleteOption || "never");
    setDeleteAfter(data?.deleteAfter || "14");
    setDeleteAfterUnit(data?.deleteAfterUnit || "day(s)");

    setLockedSnapshotsEnabled(data?.lockedSnapshotsEnabled || false);
    setEnablePolicy(data?.enablePolicy ?? true);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            value={policyName}
            onChange={e => setPolicyName(e.target.value)}
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
              value={applyDirectory}
              onChange={e => setApplyDirectory(e.target.value)}
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
              value={scheduleType}
              onChange={e => setScheduleType(e.target.value)}
            >
              <option>Daily or Weekly</option>
              {/* <option>Monthly</option> */}
            </select>
          </div>
          {/* Set to Time Zone */}
          <div className="flex flex-col md:flex-row md:items-center bg-[#242C35] p-2">
            <label className="font-nunito text-[#C7CACC] text-[15px] mr-4 mb-2 md:mb-0">
              Set to Time Zone
            </label>
            <span className="font-nunito text-[#C7CACC] bg-transparent px-3 py-2">{timeZone}</span>
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
              type="text"
              inputMode="numeric"
              pattern="^([01]\d|2[0-3])$"
              min="0"
              max="23"
              maxLength={2}
              value={snapshotHour}
              placeholder="07"
              className="w-14 bg-[#424B5380] border border-[#424B53] rounded-md px-2 py-2 text-[#C7CACC] font-nunito text-center mr-2 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
              style={{ MozAppearance: 'textfield' }}
              onInput={e => {
                const input = e.target as HTMLInputElement;
                let v = input.value.replace(/[^0-9]/g, '');
                if (v.length > 2) v = v.slice(0, 2);
                if (v.length === 2 && (parseInt(v, 10) < 0 || parseInt(v, 10) > 23)) v = v.slice(0, 1);
                // Prevent values > 23
                if (v && parseInt(v, 10) > 23) v = "23";
                // Pad with 0 if needed
                if (v.length === 1 && parseInt(v, 10) > 2) v = "0" + v;
                input.value = v;
                setSnapshotHour(v);
              }}
            />
            <span className="text-[#C7CACC] font-nunito mr-2">:</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="^[0-5][0-9]$"
              min="0"
              max="59"
              maxLength={2}
              value={snapshotMinute}
              placeholder="00"
              className="w-14 bg-[#424B5380] border border-[#424B53] rounded-md px-2 py-2 text-[#C7CACC] font-nunito text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
              style={{ MozAppearance: 'textfield' }}
              onInput={e => {
                // @ts-ignore
                const input = e.target as HTMLInputElement;
                let v = input.value.replace(/[^0-9]/g, '');
                if (v.length > 2) v = v.slice(0, 2);
                if (v.length === 2 && (parseInt(v, 10) < 0 || parseInt(v, 10) > 59)) v = v.slice(0, 1);
                // Prevent values > 59
                if (v && parseInt(v, 10) > 59) v = "59";
                // Pad with 0 if needed
                if (v.length === 1 && parseInt(v, 10) > 5) v = "0" + v;
                input.value = v;
                setSnapshotMinute(v);
              }}
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
                  checked={everyDayChecked}
                  onChange={e => handleEveryDayChange(e.target.checked)}
                  value="everyday"
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
                  checked={monChecked}
                  onChange={e => setMonChecked(e.target.checked)}
                  value="mon"
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
                  checked={tueChecked}
                  onChange={e => setTueChecked(e.target.checked)}
                  value="tue"
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
                  checked={wedChecked}
                  onChange={e => setWedChecked(e.target.checked)}
                  value="wed"
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
                  checked={thurChecked}
                  onChange={e => setThurChecked(e.target.checked)}
                  value="thur"
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
                  checked={friChecked}
                  onChange={e => setFriChecked(e.target.checked)}
                  value="fri"
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
                  checked={satChecked}
                  onChange={e => setSatChecked(e.target.checked)}
                  value="sat"
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
                  checked={sunChecked}
                  onChange={e => setSunChecked(e.target.checked)}
                  value="sun"
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
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="1"
                  value={deleteAfter}
                  className={`w-14 bg-[#424B5380] border border-[#424B53] rounded-md px-2 py-1 mx-2 font-nunito text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none ${
                    deleteOption === "never" ? "text-[#777777]" : "text-[#C7CACC]"
                  }`}
                  style={{ MozAppearance: 'textfield' }}
                  disabled={deleteOption !== "auto"}
                  onInput={e => {
                    (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
                    setDeleteAfter((e.target as HTMLInputElement).value);
                  }}
                />
                <select
                  className={`bg-[#424B5380] border border-[#424B53] rounded-md px-2 py-1 font-nunito ${
                    deleteOption !== "auto" ? "text-[#777777]" : "text-[#C7CACC]"
                  }`}
                  disabled={deleteOption !== "auto"}
                  value={deleteAfterUnit}
                  onChange={e => setDeleteAfterUnit(e.target.value)}
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
                style={{
                  accentColor: '#007ACC',
                  backgroundColor: '#007ACC',
                  color: '#fff'
                }}
                checked={enablePolicy}
                onChange={e => setEnablePolicy(e.target.checked)}
              />
              Enable policy
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-[#0298FF] hover:bg-[#007ACC] text-white font-nunito px-5 py-2 rounded-md text-[15px] font-normal transition-colors"
              type="submit"
            >
              Save Policy
            </button>
            <button
              className="text-[#0298FF] hover:underline font-nunito text-[15px] font-normal px-2 py-2 rounded-md"
              type="button"
              onClick={() => {
                if (snapshotData) resetFormToSnapshot(snapshotData);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}