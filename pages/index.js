import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Login from './login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='mx-auto' >
    <Link href="/login" >login page</Link>
    <Login/>
    </div>
  )
}
