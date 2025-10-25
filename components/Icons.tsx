

import React from 'react';

type IconProps = {
  className?: string;
};

export const HamburgerIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <linearGradient id="gastroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#EF4444'}} />
                <stop offset="100%" style={{stopColor: '#F59E0B'}} />
            </linearGradient>
        </defs>
        <path fill="url(#gastroGradient)" d="M54.7,21.3c-1.2-0.2-2.3-0.6-3.3-1.1C45,16.8,38.3,14,32,14s-13,2.8-19.4,6.2c-1,0.5-2.1,0.9-3.3,1.1 C3,22.2,0,25.8,0,30c0,1.1,0.9,2,2,2h60c1.1,0,2-0.9,2-2C64,25.8,61,22.2,54.7,21.3z M16,21c0-0.6,0.4-1,1-1s1,0.4,1,1 c0,0.6-0.4,1-1,1S16,21.6,16,21z M24,19c0-0.6,0.4-1,1-1s1,0.4,1,1c0,0.6-0.4,1-1,1S24,19.6,24,19z M40,20c0-0.6,0.4-1,1-1s1,0.4,1,1 c0,0.6-0.4,1-1,1S40,20.6,40,20z M48,22c0-0.6,0.4-1,1-1s1,0.4,1,1c0,0.6-0.4,1-1,1S48,22.6,48,22z"></path>
        <path fill="url(#gastroGradient)" d="M2,34v2c0,1.1,0.9,2,2,2h56c1.1,0,2-0.9,2-2v-2H2z"></path>
        <path fill="url(#gastroGradient)" d="M60,40H4c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h56c1.1,0,2-0.9,2-2v-6C62,40.9,61.1,40,60,40z"></path>
    </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.837A1.125 1.125 0 0018.042 6H5.212A1.125 1.125 0 004.086 7.165L5.75 14.25M7.5 14.25h11.25M10.5 21a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.423l-4.28 1.07a.375.375 0 01-.427-.427l1.07-4.28A9.756 9.756 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.4-1.4l-1.188-.648 1.188-.648a2.25 2.25 0 011.4-1.4l.648-1.188.648 1.188a2.25 2.25 0 011.4 1.4l1.188.648-1.188.648a2.25 2.25 0 01-1.4 1.4z" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5M12 4.5v.01M12 19.5v.01" />
    </svg>
);

export const AdjustmentsIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);


export const ChartBarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

export const ClipboardListIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const CollectionIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

export const BellIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);

export const StripeLogo: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M52.95 6.05H49.1V2.1H46.55V6.05H43.15V8.6H46.55V19.9H49.1V8.6H52.95V6.05Z" fill="#635BFF"/>
    <path d="M40.2 6.05H32.5C31.25 6.05 30.2 7.05 30.2 8.35V17.35C30.2 18.65 31.25 19.65 32.5 19.65H40.15C41.4 19.65 42.45 18.65 42.45 17.35V14.1H39.25V16.7H32.75V9.25H39.5V11.75H42.45V8.3C42.45 7 41.45 6.05 40.2 6.05Z" fill="#635BFF"/>
    <path d="M26.45 19.9V12.4C26.45 10.5 27.65 9.15 29.55 8.9V8.85C28.2 8.65 27.25 7.8 27.25 6.45C27.25 4.6 28.6 3.4 30.6 3.4C32.75 3.4 33.95 4.85 33.95 6.5C33.95 7.8 33.05 8.65 31.85 8.85V8.95C33.55 9.25 34.8 10.45 34.8 12.35V19.9H32.25V12.7C32.25 11.45 31.6 10.8 30.55 10.8C29.5 10.8 28.95 11.5 28.95 12.7V19.9H26.45ZM31.45 6.4C31.45 5.6 31 5.1 30.45 5.1C29.85 5.1 29.5 5.65 29.5 6.35C29.5 7.15 29.95 7.65 30.5 7.65C31.1 7.65 31.45 7.1 31.45 6.4Z" fill="#635BFF"/>
    <path d="M24.1 19.9H21.55V12.6C21.55 10.45 20.35 9.3 18.3 9.3C16.3 9.3 15.2 10.4 15.2 12.6V19.9H12.65V6.05H15.2V7.45C15.85 6.55 16.9 5.8 18.35 5.8C20.15 5.8 22.05 6.8 22.05 9.85L21.5 10.35C22.95 9.7 24.1 10.75 24.1 12.6V19.9Z" fill="#635BFF"/>
    <path d="M10.3 19.9H7.75V0H10.3V19.9Z" fill="#635BFF"/>
    <path d="M5.25 12.45V19.9H2.7V6.05H5.8C7.7 6.05 9.15 6.95 9.15 9.1C9.15 10.7 8.3 11.75 6.8 12.15L9.6 19.9H6.7L4.4 12.45H5.25ZM5.25 10.2H5.9C6.8 10.2 7.3 9.75 7.3 9.05C7.3 8.35 6.8 7.9 5.9 7.9H5.25V10.2Z" fill="#635BFF"/>
  </svg>
);

export const MercadoPagoLogo: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M89.75 68H10.25C4.588 68 0 63.412 0 57.75V10.25C0 4.588 4.588 0 10.25 0H89.75C95.412 0 100 4.588 100 10.25V57.75C100 63.412 95.412 68 89.75 68Z" fill="#009EE3"/>
    <path d="M50 51.5C64.636 51.5 76.5 42.492 76.5 31.5C76.5 20.508 64.636 11.5 50 11.5C35.364 11.5 23.5 20.508 23.5 31.5C23.5 42.492 35.364 51.5 50 51.5Z" fill="white"/>
    <path d="M50.041 39.557C56.126 39.557 61.082 36.423 61.082 32.352C61.082 28.28 56.126 25.147 50.041 25.147C43.956 25.147 38.999 28.28 38.999 32.352C38.999 36.423 43.956 39.557 50.041 39.557Z" fill="#009EE3"/>
  </svg>
);

export const PagSeguroLogo: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.3 29.8V42.2H5V7.8H18.1C21.8 7.8 24.7 8.7 26.8 10.5C28.9 12.3 30 14.8 30 18C30 20.3 29.4 22.3 28.2 24C27 25.7 25.3 26.9 23.1 27.6L29.3 42.2H22.2L16.8 29.8H12.3ZM12.3 23.8H18.7C20.6 23.8 21.9 23.2 22.8 22.1C23.7 21 24.2 19.6 24.2 18C24.2 15.1 22.7 13.7 19.8 13.7H12.3V23.8Z" fill="#F79632"/>
    <path d="M54 26.8C54 30.6 53 33.7 51 36.1C49 38.5 46.2 39.7 42.6 39.7C39 39.7 36.2 38.5 34.2 36.1C32.2 33.7 31.2 30.6 31.2 26.8C31.2 23 32.2 19.9 34.2 17.5C36.2 15.1 39 13.9 42.6 13.9C46.2 13.9 49 15.1 51 17.5C53 19.9 54 23 54 26.8ZM46.9 26.8C46.9 24.2 46.4 22.2 45.4 20.8C44.4 19.4 43.2 18.7 41.8 18.7C40.4 18.7 39.2 19.4 38.2 20.8C37.2 22.2 36.7 24.2 36.7 26.8C36.7 29.4 37.2 31.4 38.2 32.8C39.2 34.2 40.4 34.9 41.8 34.9C43.2 34.9 44.4 34.2 45.4 32.8C46.4 31.4 46.9 29.4 46.9 26.8Z" fill="#152C42"/>
    <path d="M78.7 42.2H71.4V14.2H78.7V42.2Z" fill="#152C42"/>
    <path d="M102.3 42.2H95V14.2H102.3V42.2Z" fill="#152C42"/>
    <path d="M126.3 42.2H119V14.2H126.3V42.2Z" fill="#152C42"/>
    <path d="M150.3 14.2V42.2H143V14.2H132.8V7.8H160.8V14.2H150.3Z" fill="#152C42"/>
    <path d="M171.7 26.8C171.7 30.6 170.7 33.7 168.7 36.1C166.7 38.5 163.9 39.7 160.3 39.7C156.7 39.7 153.9 38.5 151.9 36.1C149.9 33.7 148.9 30.6 148.9 26.8C148.9 23 149.9 19.9 151.9 17.5C153.9 15.1 156.7 13.9 160.3 13.9C163.9 13.9 166.7 15.1 168.7 17.5C170.7 19.9 171.7 23 171.7 26.8ZM164.6 26.8C164.6 24.2 164.1 22.2 163.1 20.8C162.1 19.4 160.9 18.7 159.5 18.7C158.1 18.7 156.9 19.4 155.9 20.8C154.9 22.2 154.4 24.2 154.4 26.8C154.4 29.4 154.9 31.4 155.9 32.8C156.9 34.2 158.1 34.9 159.5 34.9C160.9 34.9 162.1 34.2 163.1 32.8C164.1 31.4 164.6 29.4 164.6 26.8Z" fill="#152C42"/>
    <path d="M195 28.3L187.8 7.8H180L188.7 30.4V42.2H195V28.3Z" fill="#152C44"/>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

export const AtSymbolIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
    </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 001.056 4.637m7.888-4.637a9.75 9.75 0 011.056 4.637m0 0H18.75m-12 0h.008v.004H6.75m.009-4.641a9.752 9.752 0 01-1.056-4.637m13.112 4.637a9.752 9.752 0 00-1.056-4.637m0 0a9.75 9.75 0 00-11.002 0m11.002 0a9.75 9.75 0 01-11.002 0m0 0a9.75 9.75 0 0111.002 0zM12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 2.25zM6.75 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm10.5 0a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75z" />
    </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3-3l3-3m0 0l-3-3m3 3H3" />
    </svg>
);

export const LocationMarkerIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21z" />
    </svg>
);

export const PixIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
    </svg>
);

export const RouteIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664l.143.258a1.125 1.125 0 01-1.707 1.708l-.143-.258a1.125 1.125 0 01-1.161-.886l-.51-.766a2.25 2.25 0 01.216-1.49l1.068-.89a1.125 1.125 0 00.405-.864v-.568a12 12 0 100 21.94" />
    </svg>
);

export const SmilingCartIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <linearGradient id="gastroSmilingCartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#EF4444'}} />
                <stop offset="100%" style={{stopColor: '#F59E0B'}} />
            </linearGradient>
        </defs>
        <path 
            fill="url(#gastroSmilingCartGradient)"
            d="M5.5,22 C4.67157288,22 4,21.3284271 4,20.5 C4,19.6715729 4.67157288,19 5.5,19 C6.32842712,19 7,19.6715729 7,20.5 C7,21.3284271 6.32842712,22 5.5,22 Z M16.5,22 C15.6715729,22 15,21.3284271 15,20.5 C15,19.6715729 15.6715729,19 16.5,19 C17.3284271,19 18,19.6715729 18,20.5 C18,21.3284271 17.3284271,22 16.5,22 Z M4.2,2 L4.2,4 L6.2,4 L9.6,12.5 L17.5,12.5 L20,6 L7.2,6 L6.4,4.3 C6.2,3.8 5.7,3.5 5.2,3.5 L2,3.5 L2,2 L5.2,2 C6.3,2 7.2,2.8 7.4,3.8 L8.4,6 L20,6 C20.6,6 21,6.4 21,7 C21,7.2 20.9,7.4 20.8,7.6 L17.8,14.6 C17.6,15.1 17.1,15.5 16.5,15.5 L8.5,15.5 C8,15.5 7.5,15.2 7.3,14.7 L3.8,4 L3.8,2 L4.2,2 Z" 
        />
        
        {/* Face on the cart body */}
        {/* Winking eye */}
        <path d="M9.5 8 C10 8.5 11 8.5 11.5 8" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round">
            <animate 
                attributeName="d" 
                values="M9.5 8 C10 8.5 11 8.5 11.5 8; M9.5 8.2 C10 7.5 11 7.5 11.5 8.2; M9.5 8 C10 8.5 11 8.5 11.5 8;" 
                dur="3s" 
                repeatCount="indefinite"
                keyTimes="0; 0.05; 0.1; 1"
            />
        </path>
        
        {/* Open eye */}
        <circle cx="14" cy="8" r="1.2" fill="currentColor" />
        <circle cx="14" cy="8" r="0.6" fill="#1F2937" />

        {/* Smile */}
        <path d="M10.5 10.5 C11.5 11.5 13.5 11.5 14.5 10.5" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
);