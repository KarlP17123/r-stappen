import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from './utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean }
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant='primary', size='md', loading, children, disabled, ...props }, ref) => <button ref={ref} className={cn('ui-button', `ui-button--${variant}`, `ui-button--${size}`, className)} disabled={disabled || loading} {...props}>{loading && <Spinner size="sm" />}<span>{children}</span></button>)
Button.displayName = 'Button'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { label: string; size?: ButtonSize }
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ className, label, size='md', children, ...props }, ref) => <button ref={ref} className={cn('ui-icon-button', `ui-icon-button--${size}`, className)} aria-label={label} title={label} {...props}>{children}</button>)
IconButton.displayName = 'IconButton'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <input ref={ref} className={cn('ui-input', className)} {...props} />)
Input.displayName = 'Input'
export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => <textarea ref={ref} className={cn('ui-input ui-textarea', className)} {...props} />)
TextArea.displayName = 'TextArea'
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(({ className, children, ...props }, ref) => <select ref={ref} className={cn('ui-input ui-select', className)} {...props}>{children}</select>)
Select.displayName = 'Select'

interface CheckProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> { label?: ReactNode }
export const Checkbox = forwardRef<HTMLInputElement, CheckProps>(({ className, label, id, ...props }, ref) => <label className={cn('ui-check', className)}><input ref={ref} id={id} type="checkbox" {...props} />{label && <span>{label}</span>}</label>)
Checkbox.displayName = 'Checkbox'
export const Radio = forwardRef<HTMLInputElement, CheckProps>(({ className, label, id, ...props }, ref) => <label className={cn('ui-check', className)}><input ref={ref} id={id} type="radio" {...props} />{label && <span>{label}</span>}</label>)
Radio.displayName = 'Radio'
export const Switch = forwardRef<HTMLInputElement, CheckProps>(({ className, label, id, ...props }, ref) => <label className={cn('ui-switch', className)}><input ref={ref} id={id} type="checkbox" {...props} /><i aria-hidden="true" />{label && <span>{label}</span>}</label>)
Switch.displayName = 'Switch'

export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <div className={cn('ui-search', className)}><span aria-hidden="true">⌕</span><Input type="search" {...props} /></div> }
export function Spinner({ size='md' }: { size?: 'sm' | 'md' | 'lg' }) { return <span className={`ui-spinner ui-spinner--${size}`} role="status" aria-label="Loading" /> }
