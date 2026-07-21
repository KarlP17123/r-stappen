'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Globe, Lock, Users, Clock, ChevronDown, Sparkles, Eye } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { categories } from '@/lib/mock-data'

const durations = ['1 Hour', '6 Hours', '1 Day', '3 Days', '1 Week', '1 Month', 'No Limit']
const audiences = [
  { id: 'everyone', label: 'Everyone', icon: Globe, desc: 'Anyone can vote' },
  { id: 'followers', label: 'Followers Only', icon: Users, desc: 'Only your followers' },
  { id: 'private', label: 'Private Link', icon: Lock, desc: 'Only via link' },
]

const examplePolls = [
  'Is AI good for society?',
  'Should higher education be free?',
  'Electric cars vs. petrol — which is better?',
  'Remote work: future or just a trend?',
]

export default function CreatePollPage() {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [duration, setDuration] = useState('1 Day')
  const [audience, setAudience] = useState('everyone')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [allowMultiple, setAllowMultiple] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const addOption = () => {
    if (options.length < 6) setOptions([...options, ''])
  }

  const removeOption = (i: number) => {
    if (options.length > 2) setOptions(options.filter((_, idx) => idx !== i))
  }

  const updateOption = (i: number, val: string) => {
    const next = [...options]
    next[i] = val
    setOptions(next)
  }

  const isValid = question.trim().length > 3 && options.filter((o) => o.trim()).length >= 2 && selectedCategory

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-screen-2xl px-4 py-20 md:px-6 flex flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-[oklch(0.65_0.20_142)]/20 mb-6">
            <svg className="size-10 text-[oklch(0.65_0.20_142)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Poll Created!</h1>
          <p className="text-muted-foreground text-sm mb-8 max-w-sm">
            Your poll <strong className="text-foreground">&quot;{question}&quot;</strong> is now live and collecting votes from around the world.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => { setSubmitted(false); setQuestion(''); setOptions(['', '']); setSelectedCategory('') }}>
              Create Another
            </Button>
            <Link href="/poll/1">
              <Button className="bg-primary text-primary-foreground">View Your Poll</Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline">Explore Polls</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create a Poll</h1>
            <p className="mt-1 text-sm text-muted-foreground">Ask the world — get real opinions from millions of people</p>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${showPreview ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}
          >
            <Eye className="size-4" />
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <div className="flex flex-col gap-6">
            {/* Question */}
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Your Question <span className="text-[oklch(0.63_0.22_27)]">*</span>
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                maxLength={280}
                className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors leading-relaxed"
                placeholder="Write your question here..."
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {examplePolls.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setQuestion(ex)}
                      className="rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                    >
                      {ex.slice(0, 30)}...
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{question.length}/280</span>
              </div>
            </div>

            {/* Options */}
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Options <span className="text-[oklch(0.63_0.22_27)]">*</span>
                </label>
                <span className="text-[10px] text-muted-foreground">{options.length}/6 options</span>
              </div>
              <div className="flex flex-col gap-3">
                {options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent text-xs font-bold text-muted-foreground">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <input
                      value={opt}
                      onChange={(e) => updateOption(i, e.target.value)}
                      className="flex-1 rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
                      placeholder={i === 0 ? 'Option 1 (e.g. Yes)' : i === 1 ? 'Option 2 (e.g. No)' : `Option ${i + 1}`}
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(i)}
                        className="text-muted-foreground hover:text-[oklch(0.63_0.22_27)] transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {options.length < 6 && (
                <button
                  onClick={addOption}
                  className="mt-4 flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <Plus className="size-4" />
                  Add option
                </button>
              )}
            </div>

            {/* Category */}
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <label className="mb-4 block text-sm font-semibold text-foreground">
                Category <span className="text-[oklch(0.63_0.22_27)]">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration & Audience */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Duration */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <label className="mb-3 block text-sm font-semibold text-foreground">
                  <Clock className="inline size-4 mr-1.5 text-muted-foreground" />
                  Poll Duration
                </label>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 transition-colors pr-8"
                  >
                    {durations.map((d) => (
                      <option key={d} value={d} className="bg-card">{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Audience */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <label className="mb-3 block text-sm font-semibold text-foreground">
                  <Users className="inline size-4 mr-1.5 text-muted-foreground" />
                  Who Can Vote
                </label>
                <div className="flex flex-col gap-2">
                  {audiences.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAudience(a.id)}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-colors ${
                        audience === a.id ? 'bg-primary/10 border border-primary/30' : 'bg-accent/50 border border-transparent hover:bg-accent'
                      }`}
                    >
                      <a.icon className={`size-4 shrink-0 ${audience === a.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div>
                        <div className={`text-xs font-medium ${audience === a.id ? 'text-primary' : 'text-foreground'}`}>{a.label}</div>
                        <div className="text-[10px] text-muted-foreground">{a.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced options */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Advanced Options</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Anonymous voting', desc: 'Hide voter identities from results', value: isAnonymous, set: setIsAnonymous },
                  { label: 'Allow multiple choices', desc: 'Voters can select more than one option', value: allowMultiple, set: setAllowMultiple },
                ].map((opt) => (
                  <div key={opt.label} className="flex items-center justify-between rounded-xl px-4 py-3 bg-accent/40">
                    <div>
                      <div className="text-xs font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] text-muted-foreground">{opt.desc}</div>
                    </div>
                    <button
                      onClick={() => opt.set(!opt.value)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${opt.value ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${opt.value ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setSubmitted(true)}
                disabled={!isValid}
                size="lg"
                className="flex-1 bg-primary text-primary-foreground glow-purple disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                <Sparkles className="size-4 mr-2" data-icon="inline-start" />
                Publish Poll
              </Button>
              <Button variant="outline" size="lg" className="sm:w-auto">
                Save as Draft
              </Button>
            </div>

            {!isValid && (
              <p className="text-[11px] text-muted-foreground -mt-2">
                Please fill in a question, at least 2 options, and select a category to publish.
              </p>
            )}
          </div>

          {/* Preview + Tips sidebar */}
          <div className="flex flex-col gap-4">
            {/* Live Preview */}
            {showPreview && (
              <div className="rounded-2xl border border-primary/30 bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Eye className="size-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Live Preview</span>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                  {selectedCategory && (
                    <Badge variant="secondary" className="mb-3 text-[10px]">
                      {categories.find((c) => c.id === selectedCategory)?.name ?? selectedCategory}
                    </Badge>
                  )}
                  <h3 className="text-base font-bold text-foreground mb-4">
                    {question || 'Your question will appear here...'}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {options.map((opt, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-border px-4 py-2.5 bg-accent/30"
                      >
                        <span className="size-5 rounded-md bg-accent flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm text-foreground">{opt || `Option ${i + 1}`}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span>{duration} duration</span>
                    <span>·</span>
                    <span>{audiences.find((a) => a.id === audience)?.label}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Tips for a Great Poll</h3>
              <div className="flex flex-col gap-3">
                {[
                  { title: 'Ask clear questions', desc: 'Keep your question simple and unambiguous.' },
                  { title: 'Balance your options', desc: 'Offer neutral, fair options for all perspectives.' },
                  { title: 'Choose the right category', desc: 'Helps your poll reach the right audience.' },
                  { title: 'Add context', desc: 'A well-described question gets more thoughtful votes.' },
                ].map((tip) => (
                  <div key={tip.title} className="flex gap-3 rounded-xl bg-accent/40 px-3 py-2.5">
                    <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-foreground">{tip.title}</div>
                      <div className="text-[10px] text-muted-foreground leading-relaxed">{tip.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade premium CTA */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <div className="mb-1 flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Premium Features</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                Unlock advanced analytics, export results, boost visibility, and access historical data.
              </p>
              <Button size="sm" className="w-full bg-primary text-primary-foreground text-xs">
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
