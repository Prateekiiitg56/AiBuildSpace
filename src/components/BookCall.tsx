"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Loader2,
  Sparkles,
} from "lucide-react";

// ─── Time Slots ───────────────────────────────────
const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

// ─── Calendar Helpers ─────────────────────────────
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// ─── Component ────────────────────────────────────
export default function BookCall() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1=calendar, 2=form, 3=success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Calendar data
  const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth]);
  const firstDay = useMemo(() => getFirstDayOfMonth(currentYear, currentMonth), [currentYear, currentMonth]);

  const isMinMonth = useMemo(() => {
    return (
      currentYear < today.getFullYear() ||
      (currentYear === today.getFullYear() && currentMonth <= today.getMonth())
    );
  }, [currentYear, currentMonth, today]);

  const prevMonth = () => {
    if (isMinMonth) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const isWeekend = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const handleDateSelect = (day: number) => {
    if (isPastDate(day) || isWeekend(day)) return;
    const dateStr = `${MONTHS[currentMonth]} ${day}, ${currentYear}`;
    setSelectedDate(dateStr);
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      setError("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          name,
          email,
          date: selectedDate,
          time: selectedTime,
          topic,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to book");
      }

      setStep(3);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setEmail("");
    setTopic("");
    setError("");
  };

  return (
    <section id="book" className="py-24 lg:py-36 relative z-10 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Cool atmospheric backgrounds */}
      <div className="bg-diag-lines" />
      <div className="bg-bloom-center" />

      {/* Section Header */}
      <div className="mb-16 md:mb-20 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 text-xs uppercase tracking-widest text-accent mb-6"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Book a Free Call</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          Let's talk about your project.{" "}
          <br />
          <span className="text-white/40 font-normal italic">Pick a time that works.</span>
        </motion.h2>
      </div>

      {/* Booking Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="glass rounded-[32px] border border-white/5 overflow-hidden max-w-4xl mx-auto"
      >
        {/* Progress Steps */}
        <div className="flex items-center gap-0 border-b border-white/5">
          {[
            { num: 1, label: "Pick a Date & Time" },
            { num: 2, label: "Your Details" },
            { num: 3, label: "Confirmed!" },
          ].map((s, i) => (
            <div
              key={s.num}
              className={`flex-1 flex items-center gap-3 px-6 py-5 transition-all duration-300 ${
                step >= s.num
                  ? "bg-accent/5 border-b-2 border-accent"
                  : "border-b-2 border-transparent"
              } ${i > 0 ? "border-l border-white/5" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > s.num
                    ? "bg-accent text-black"
                    : step === s.num
                    ? "bg-accent/20 text-accent border border-accent/40"
                    : "bg-white/5 text-white/30"
                }`}
              >
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span
                className={`text-xs font-mono font-bold uppercase tracking-wider hidden sm:block ${
                  step >= s.num ? "text-white" : "text-white/30"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 min-h-[440px]">
          <AnimatePresence mode="wait">
            {/* ─── Step 1: Calendar + Time ─── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              >
                {/* Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-accent" />
                      {MONTHS[currentMonth]} {currentYear}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={prevMonth}
                        disabled={isMinMonth}
                        className={`w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center transition-all ${
                          isMinMonth
                            ? "opacity-20 cursor-not-allowed"
                            : "hover:bg-white/10 hover:border-white/10"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextMonth}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/10 transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map((d) => (
                      <div
                        key={d}
                        className="text-center text-[10px] uppercase tracking-widest text-white/30 font-mono font-bold py-2"
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Day Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before the 1st */}
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-10" />
                    ))}
                    {/* Day cells */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const disabled = isPastDate(day) || isWeekend(day);
                      const selected =
                        selectedDate === `${MONTHS[currentMonth]} ${day}, ${currentYear}`;
                      const todayFlag = isToday(day);

                      return (
                        <button
                          key={day}
                          disabled={disabled}
                          onClick={() => handleDateSelect(day)}
                          className={`h-10 rounded-lg text-sm font-medium transition-all duration-200 relative
                            ${
                              disabled
                                ? "text-white/10 cursor-not-allowed"
                                : selected
                                ? "bg-accent text-black font-bold scale-105 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                                : todayFlag
                                ? "bg-white/10 text-accent border border-accent/30"
                                : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                          {day}
                          {todayFlag && !selected && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-accent" />
                    Available Times
                    {selectedDate && (
                      <span className="text-xs text-white/40 font-normal ml-1">
                        — {selectedDate}
                      </span>
                    )}
                  </h3>

                  {!selectedDate ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-4">
                        <Calendar className="w-7 h-7 text-white/20" />
                      </div>
                      <p className="text-sm text-white/30">
                        Select a date to see available time slots
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-xl text-sm font-mono font-bold transition-all duration-200
                            ${
                              selectedTime === time
                                ? "bg-accent text-black border border-accent shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                                : "bg-white/5 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/10"
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Continue Button */}
                <div className="lg:col-span-2 flex justify-end pt-4 border-t border-white/5">
                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(2)}
                    className={`px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-300
                      ${
                        selectedDate && selectedTime
                          ? "bg-accent text-black hover:scale-[1.02] active:scale-[0.98]"
                          : "bg-white/5 text-white/20 cursor-not-allowed"
                      }`}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── Step 2: Details Form ─── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-lg mx-auto"
              >
                {/* Selected Slot Summary */}
                <div className="flex items-center gap-4 mb-10 p-4 rounded-xl bg-accent/5 border border-accent/10">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{selectedDate}</p>
                    <p className="text-xs text-accent font-mono">{selectedTime} (IST)</p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="ml-auto text-xs text-white/40 hover:text-accent transition-colors underline underline-offset-2"
                  >
                    Change
                  </button>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-mono font-bold flex items-center gap-1.5">
                      <User className="w-3 h-3" /> Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/5 border border-white/5 focus:border-accent/40 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-mono font-bold flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border border-white/5 focus:border-accent/40 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-mono font-bold flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" /> What should we discuss?
                      <span className="text-white/20 normal-case">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="bg-white/5 border border-white/5 focus:border-accent/40 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors resize-none"
                      placeholder="Tell us about your project, goals, or any questions..."
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-400 bg-red-400/5 border border-red-400/10 rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white/5 border border-white/5 text-white/60 hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-accent text-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4" />
                          Confirm Booking
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── Step 3: Success ─── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-8"
                >
                  <Check className="w-10 h-10 text-accent" />
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Call Booked Successfully!
                </h3>
                <p className="text-white/50 text-sm md:text-base max-w-md mb-2">
                  We've received your booking and you'll get a confirmation email shortly.
                </p>

                <div className="flex items-center gap-3 mt-4 mb-8 px-6 py-4 rounded-2xl bg-accent/5 border border-accent/10">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="text-sm font-bold text-white">{selectedDate}</span>
                  <span className="text-white/20">•</span>
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-sm font-mono text-accent">{selectedTime}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/30 mb-8">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>We typically respond within 2 hours</span>
                </div>

                <button
                  onClick={resetForm}
                  className="text-sm text-white/40 hover:text-accent transition-colors underline underline-offset-4"
                >
                  Book another call
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
