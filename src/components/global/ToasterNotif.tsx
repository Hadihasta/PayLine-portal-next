'use client'
import { toast } from 'sonner'

// Tipe toast
type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default'

/**
 * ToasterNotif() — helper global
 * @param type jenis toast (success, error, info, warning)
 * @param message pesan utama
 * @param color optional warna custom (default: auto by type)
 */
export function ToasterNotif(type: ToastType, message: string, color?: string) {
  const baseStyle = {
    background: color || '#374151' ,
    color: '#fff',
    border: 'none',
  }

  switch (type) {
    case 'success':
      toast.success(message, { style: baseStyle })
      break
    case 'error':
      toast.error(message, { style: baseStyle })
      break
    case 'info':
      toast.info(message, { style: baseStyle })
      break
    case 'warning':
      toast.warning(message, { style: baseStyle })
      break
    default:
      toast(message, { style: baseStyle })
  }
}

// case 'success': return '#16a34a' // green-600
// case 'error': return '#dc2626'   // red-600
//case 'info': return '#2563eb'    // blue-600
// case 'warning': return '#f59e0b' // amber-500
//default: return '#374151'        // gray-700
