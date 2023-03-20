import Link from "next/link";

export default function Item() {
  return (
    <Link href="/items/1">
      <div className="flex cursor-pointer items-center justify-between space-x-4 border-b pb-2">
        <div className="flex">
          <div className="h-20 w-20 rounded-md bg-gray-400 " />
          <div className="ml-4 flex flex-col items-start justify-start">
            <span className="text-lg font-bold text-gray-900">iPhone</span>
            <span className="text-xs font-medium text-gray-500">Black</span>
            <span className="mt-1 font-medium text-gray-900">$95</span>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-end space-x-1.5">
          <div className="flex-x-center space-x-0.5 text-sm text-gray-600">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span>1</span>
          </div>
          <div className="flex-x-center space-x-0.5 text-sm text-gray-600">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <span>1</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
