'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { challengesFilterList } from '#/lib/challengesFilterList'
import { createQueryString } from '@/utils'

export function ChallengesFilter() {
  const [list, setList] = useState(challengesFilterList)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  return (
    <div>
      {list.map((i, k) => (
        <div key={`learn-challenges-filter-${i.name}`} className="mb-8">
          <h4 className="mb-4 flex items-center justify-between text-lg font-bold">
            {i.name}
            {i.open ? (
              <ChevronUpIcon
                onClick={() => {
                  const curr = [...list]
                  curr[k].open = !curr[k].open
                  setList(curr)
                }}
                className="h-4 w-4 cursor-pointer fill-gray-500 text-gray-500"
              />
            ) : (
              <ChevronDownIcon
                onClick={() => {
                  const curr = [...list]
                  curr[k].open = !curr[k].open
                  setList(curr)
                }}
                className="h-4 w-4 cursor-pointer fill-gray-500 text-gray-500"
              />
            )}
          </h4>
          {i.open && (
            <div className="flex flex-wrap">
              {i.labels.map((t, k) => (
                <button
                  onClick={() => router.replace(pathname + '?' + createQueryString(i.name.toLowerCase(), t.key, new URLSearchParams(searchParams)))}
                  key={`learn-filter-${i.name}-${t.name}-${k}`}
                  variant="outlined"
                  className={clsx(
                    'flex border text-sm rounded justify-center items-center px-2 py-1 mr-2 mb-2 border-gray-600 transition-all duration-300 hover:text-gray hover:!border-gray hover:!bg-gradient-l-r hover:opacity-100',
                    {
                      '!border-gray bg-gradient-l-r opacity-100':
                        searchParams
                          .get(i.name.toLowerCase())
                          ?.split(',')
                          .find(f => f === t.key) || searchParams.get(i.name.toLowerCase()) === 'all',
                    }
                  )}
                >
                  <Image className="mr-1" width={16} height={16} src={t.img} alt="" />
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
