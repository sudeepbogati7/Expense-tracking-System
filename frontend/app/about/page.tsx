'use client';
import './about.css';
import '../page.css';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';


export default function AboutMe() {
    return (
        <>
            <header className="h-16 fixed z-50 bg-gray-200 dark:bg-gray-900 top-0 flex align-center shadow-gray-500/10 shadow-md justify-between w-full p-4 dark:shadow-gray-500/30">
                <span className="my-auto">
                    <ThemeSwitcher />
                </span>
                <Link href={"/"}>
                    {" "}
                    <div className="tracking-widest font-medium flex text-lg border-b-2 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-900  ease-linear dark:border-gray-500 border-gray-300 my-auto">
                        <span className="text-sm tracking-widest font-normal  border-t-2 border-orange-400">my </span>
                        <span className="text-3xl text-orange-600"> X</span>
                        <span className="tracking-widest text-base font-normal border-t-2 border-orange-400"> penses</span>
                    </div>
                </Link>
                <button className='border border-gray-400 px-2 rounded-lg text-center hover:bg-orange-400 hover:text-white text-base active:bg-orange-800 active:text-white transition-all duration-300 ease'><a href="/"> Home </a> </button>
            </header>

            <div className="mt-14 container flex items-center w-full mx-auto py-4 px-2 my-4 flex-col mx-auto border-b border-gray-400 ">
                <div className='flex gap-6 items-center p-2 border-b-2 border-gray-400  '>
                    <div className='flex flex-col items-center '>
                        <div className='font-semibold tracking-wide text-xl border-b border-orange-400 text-orange-600 '>Sudeep Bogati</div>
                        <span className='text-xs font-medium'>Software Engineer</span>
                        <span className='text-xs'>Kathmandu,Nepal</span>
                    </div>
                    <div className='border-2 border-[#c97534] w-fit h-fit rounded-l-xl overflow-hidden'><Image src={'/about.jpg'} width={150} height={150} alt='about-me-image' style={{ objectFit: 'cover' }}></Image></div>
                </div>
                <p className='w-4/5 w-full text-sm px-2 py-4 tracking-wide md:w-4/5 xl:w-1/2'> Hello, This is Sudeep Bogati,a passionate Software Engineer from Nepal, passionate about using technology to solve problems and create innovative solutions. I am skilled in applying my engineering knowledge to design, develop, and maintain software applications. With a strong foundation in <span className='font-medium '> TypeScript </span>, <span className='font-medium '> NEXT.js </span>, <span className='font-medium'> NODE.js </span> , I am eager to contribute to projects that make a positive impact.</p>
                {/* social links */}
                <div className="social-buttons dark:bg-gray-500">
                    <Link href="https://github.com/sudeepbogati7" className="social-button github">
                        <svg className="cf-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 0 19 19"><path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"></path></svg>
                    </Link>
                    <Link href="https://linkedin.com/in/sudeep-bogati" className="social-button linkedin">
                        <svg viewBox="0 -2 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Icons" stroke="none" stroke-width="1">
                                <g transform="translate(-702.000000, -265.000000)">
                                    <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" id="LinkedIn">
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </Link>
                    <Link href="https://facebook.com/" className="social-button facebook">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 310">
                            <g id="XMLID_834_">
                                <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064
                            c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996
                            V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545
                            C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703
                            c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"></path>
                            </g>
                        </svg>
                    </Link>
                    <Link href="https://instagram.com/the.sudeep_" className="social-button instagram">
                        <svg width="800px" height="800px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Page-1" stroke="none" stroke-width="1">
                                <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -7439.000000)">
                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                        <path d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792" id="instagram-[#167]">

                                        </path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </Link>
                </div>
                <div className='flex gap-2 mt-4 items-center'>
                    <span className='text-xs '>Reach me:</span>
                    <span className='tracking-widest text-orange-700 text-sm'>hello@sudipbogati.com.np</span>
                </div>

            </div>
            <div className='flex items-left w-full md:w-2/3  xl:w-1/2  mx-auto flex-col px-4'>
                <h1 className='text-lg font-semibold border-b-2 mx-auto w-fit border-orange-400'> About Expense Tracker Project</h1>
                <span className='font-semibold my-2  text-base'>Introduction</span>
                <span className=''>This expense tracker application helps you manage your personal finances effectively. It provides features for:</span>
                <ul className='list-disc p-4 text-base'>
                    <li>Secure user authentication with JWT.</li>
                    <li>Visualizing spending patterns with charts and graphs.</li>
                    <li>Tracking daily and monthly expenses.</li>
                </ul>
                <span className='font-semibold text-base py-2'>Technologies Used:</span>
                <div className='flex items-center justify-around rounded-xl bg-gray-50 border border-gray-400 dark:bg-gray-500'>
                    <span className=' rounded-full overflow-hidden'>
                        <svg height="30pt" viewBox=".5 -.2 1023 1024.1" width="20pt" xmlns="http://www.w3.org/2000/svg"><path d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z" /><path d="m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z" /></svg>
                    </span>
                    <span className=''>
                        <Image src={'/ts-logo-256.png'} width={25} height={25} alt='ts-logo'></Image>
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30"><path d="M32 24.795c-1.164.296-1.884.013-2.53-.957l-4.594-6.356-.664-.88-5.365 7.257c-.613.873-1.256 1.253-2.4.944l6.87-9.222-6.396-8.33c1.1-.214 1.86-.105 2.535.88l4.765 6.435 4.8-6.4c.615-.873 1.276-1.205 2.38-.883l-2.48 3.288-3.36 4.375c-.4.5-.345.842.023 1.325L32 24.795zM.008 15.427l.562-2.764C2.1 7.193 8.37 4.92 12.694 8.3c2.527 1.988 3.155 4.8 3.03 7.95H1.48c-.214 5.67 3.867 9.092 9.07 7.346 1.825-.613 2.9-2.042 3.438-3.83.273-.896.725-1.036 1.567-.78-.43 2.236-1.4 4.104-3.45 5.273-3.063 1.75-7.435 1.184-9.735-1.248C1 21.6.434 19.812.18 17.9c-.04-.316-.12-.617-.18-.92q.008-.776.008-1.552zm1.498-.38h12.872c-.084-4.1-2.637-7.012-6.126-7.037-3.83-.03-6.58 2.813-6.746 7.037z" /></svg>
                    </span>
                    <span className='w-fit'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" preserveAspectRatio="xMidYMid"><g transform="matrix(.217946 0 0 .217946 4.120542 14.085548)"><path d="M471.05 51.6c-1.245 0-2.455.257-3.526.863l-33.888 19.57c-2.193 1.263-3.526 3.65-3.526 6.188v39.07c0 2.537 1.333 4.92 3.526 6.187l8.85 5.1c4.3 2.12 5.886 2.086 7.843 2.086 6.366 0 10-3.863 10-10.577V81.542c0-.545-.472-.935-1.007-.935h-4.245c-.544 0-1.007.4-1.007.935v38.565c0 2.976-3.1 5.97-8.13 3.454l-9.2-5.396c-.325-.177-.576-.5-.576-.863v-39.07c0-.37.248-.748.576-.935l33.817-19.5c.317-.182.694-.182 1.007 0l33.817 19.5c.322.193.576.553.576.935v39.07c0 .373-.187.755-.504.935l-33.888 19.5c-.3.173-.7.173-1.007 0l-8.706-5.18c-.26-.152-.613-.14-.863 0-2.403 1.362-2.855 1.52-5.108 2.302-.555.193-1.4.494.288 1.44l11.368 6.7c1.082.626 2.288.935 3.526.935 1.255 0 2.443-.3 3.526-.935l33.888-19.5c2.193-1.276 3.526-3.65 3.526-6.187v-39.07c0-2.538-1.333-4.92-3.526-6.188l-33.888-19.57c-1.062-.606-2.28-.863-3.526-.863zm9.066 27.918c-9.65 0-15.397 4.107-15.397 10.936 0 7.4 5.704 9.444 14.966 10.36 11.08 1.085 11.944 2.712 11.944 4.893 0 3.783-3.016 5.396-10.145 5.396-8.956 0-10.925-2.236-11.584-6.7-.078-.478-.446-.863-.935-.863h-4.4a1.03 1.03 0 0 0-1.007 1.007c0 5.703 3.102 12.447 17.916 12.447 10.723 0 16.908-4.2 16.908-11.584 0-7.3-4.996-9.273-15.397-10.65-10.5-1.4-11.512-2.07-11.512-4.533 0-2.032.85-4.75 8.634-4.75 6.953 0 9.523 1.5 10.577 6.188.092.44.48.8.935.8h4.4c.27 0 .532-.166.72-.36.184-.207.314-.44.288-.72-.68-8.074-6.064-11.872-16.908-11.872z" fill="#83cd29" /><path d="M271.82.383a2.18 2.18 0 0 0-1.079.288 2.18 2.18 0 0 0-1.079 1.871v55.042c0 .54-.252 1.024-.72 1.295a1.5 1.5 0 0 1-1.511 0l-8.994-5.18a4.31 4.31 0 0 0-4.317 0L218.218 74.42c-1.342.774-2.16 2.264-2.16 3.813v41.443a4.31 4.31 0 0 0 2.159 3.741l35.903 20.722a4.3 4.3 0 0 0 4.317 0l35.903-20.722a4.31 4.31 0 0 0 2.159-3.741V16.356c0-1.572-.858-3.047-2.23-3.813L272.9.598c-.336-.187-.708-.22-1.08-.216zM40.86 52.115c-.685.028-1.328.147-1.943.504L3.015 73.34a4.3 4.3 0 0 0-2.158 3.741L.93 132.7c0 .774.4 1.492 1.08 1.87.667.4 1.494.4 2.158 0l21.297-12.232c1.35-.8 2.23-2.196 2.23-3.74V92.623c0-1.55.815-2.97 2.16-3.74l9.066-5.252a4.25 4.25 0 0 1 2.158-.576 4.24 4.24 0 0 1 2.159.576L52.3 88.88c1.343.77 2.158 2.192 2.158 3.74v25.974c0 1.546.9 2.95 2.23 3.74l21.297 12.232c.67.4 1.495.4 2.158 0 .66-.38 1.08-1.097 1.08-1.87l.072-55.617a4.28 4.28 0 0 0-2.158-3.741L43.235 52.618c-.607-.356-1.253-.476-1.943-.504h-.43zm322.624.504a4.29 4.29 0 0 0-2.159.576l-35.903 20.722c-1.34.775-2.16 2.192-2.16 3.74V119.1c0 1.558.878 2.97 2.23 3.74l35.615 20.3c1.315.75 2.92.807 4.245.07l21.585-12.016c.685-.38 1.148-1.09 1.15-1.87s-.403-1.482-1.08-1.87l-36.12-20.722c-.676-.386-1.15-1.167-1.15-1.943V91.83c0-.774.48-1.484 1.15-1.87l11.224-6.476c.668-.386 1.488-.386 2.16 0L375.5 89.96a2.15 2.15 0 0 1 1.079 1.87v10.217a2.15 2.15 0 0 0 1.079 1.87c.673.388 1.488.39 2.16 0L401.33 91.4c1.335-.776 2.16-2.197 2.16-3.74v-10a4.32 4.32 0 0 0-2.159-3.741l-35.687-20.722a4.28 4.28 0 0 0-2.159-.576zm-107.35 30.94a1.21 1.21 0 0 1 .576.143l12.303 7.123c.334.193.576.55.576.935v14.246c0 .387-.24.743-.576.935l-12.303 7.123c-.335.19-.744.19-1.08 0l-12.303-7.123c-.335-.193-.576-.55-.576-.935V91.758c0-.386.242-.74.576-.935l12.303-7.122c.168-.097.316-.143.504-.143v-.001z" fill="#404137" /><path d="M148.714 52.402a4.31 4.31 0 0 0-2.16.576l-35.903 20.65c-1.342.774-2.158 2.265-2.158 3.813v41.443a4.3 4.3 0 0 0 2.158 3.74l35.903 20.722a4.3 4.3 0 0 0 4.317 0l35.903-20.722a4.31 4.31 0 0 0 2.159-3.741V77.44c0-1.55-.816-3.04-2.16-3.813l-35.903-20.65a4.27 4.27 0 0 0-2.16-.576zm214.7 36.983c-.143 0-.302 0-.432.07l-6.907 4.03a.84.84 0 0 0-.432.719v7.915c0 .298.173.57.432.72l6.907 3.957a.75.75 0 0 0 .79 0l6.907-3.957c.256-.147.432-.422.432-.72v-7.915c0-.298-.175-.57-.432-.72l-6.907-4.03c-.128-.076-.216-.07-.36-.07z" fill="#83cd29" /></g></svg>
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient x1="0" y1="-21.333" y2="85.333" id="A" x2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#2383ae" offset="0%" /><stop stop-color="#6dd7b9" offset="100%" /></linearGradient></defs><path d="M16 25.6c2.133-8.533 7.467-12.8 16-12.8 12.8 0 14.4 9.6 20.8 11.2 4.267 1.067 8-.533 11.2-4.8C61.867 27.733 56.533 32 48 32c-12.8 0-14.4-9.6-20.8-11.2-4.267-1.067-8 .533-11.2 4.8zM0 44.8C2.133 36.267 7.467 32 16 32c12.8 0 14.4 9.6 20.8 11.2 4.267 1.067 8-.533 11.2-4.8-2.133 8.533-7.467 12.8-16 12.8-12.8 0-14.4-9.6-20.8-11.2-4.267-1.067-8 .533-11.2 4.8z" fill="url(#A)" fill-rule="evenodd" /></svg>
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="45" width="45" viewBox="-64.85325 -111.279 562.0615 667.674"><g fill="none" stroke="#fff" stroke-width="12.465" stroke-linecap="round" stroke-linejoin="round"><path d="M323.205 324.227c2.833-23.6 1.984-27.062 19.563-23.239l4.463.392c13.517.615 31.199-2.174 41.587-7 22.362-10.376 35.622-27.7 13.572-23.148-50.297 10.376-53.755-6.655-53.755-6.655 53.111-78.803 75.313-178.836 56.149-203.322C352.514-5.534 262.036 26.05 260.522 26.87l-.482.09c-9.938-2.063-21.06-3.295-33.554-3.497-22.761-.374-40.032 5.967-53.133 15.904 0 0-161.408-66.498-153.899 83.628 1.597 31.936 45.777 241.655 98.47 178.31 19.259-23.163 37.871-42.748 37.871-42.748 9.242 6.14 20.307 9.272 31.912 8.147l.897-.765c-.281 2.876-.157 5.69.359 9.02-13.572 15.166-9.584 17.83-36.723 23.415-27.457 5.66-11.326 15.734-.797 18.367 12.768 3.193 42.305 7.716 62.268-20.224l-.795 3.188c5.325 4.26 4.965 30.62 5.72 49.452.756 18.834 2.017 36.41 5.856 46.771 3.839 10.36 8.369 37.05 44.036 29.406 29.809-6.388 52.6-15.582 54.677-101.107" fill="#000" stroke="#000" stroke-width="37.395" stroke-linecap="butt" stroke-linejoin="miter" /><path d="M402.395 271.23c-50.302 10.376-53.76-6.655-53.76-6.655 53.111-78.808 75.313-178.843 56.153-203.326-52.27-66.785-142.752-35.2-144.262-34.38l-.486.087c-9.938-2.063-21.06-3.292-33.56-3.496-22.761-.373-40.026 5.967-53.127 15.902 0 0-161.411-66.495-153.904 83.63 1.597 31.938 45.776 241.657 98.471 178.312 19.26-23.163 37.869-42.748 37.869-42.748 9.243 6.14 20.308 9.272 31.908 8.147l.901-.765c-.28 2.876-.152 5.69.361 9.02-13.575 15.166-9.586 17.83-36.723 23.415-27.459 5.66-11.328 15.734-.796 18.367 12.768 3.193 42.307 7.716 62.266-20.224l-.796 3.188c5.319 4.26 9.054 27.711 8.428 48.97-.626 21.258-1.044 35.853 3.147 47.253 4.191 11.4 8.368 37.05 44.042 29.406 29.809-6.388 45.256-22.942 47.405-50.555 1.525-19.63 4.976-16.729 5.194-34.28l2.768-8.309c3.192-26.61.507-35.196 18.872-31.203l4.463.392c13.517.615 31.208-2.174 41.591-7 22.358-10.376 35.618-27.7 13.573-23.148z" fill="#336791" stroke="none" /><path d="M215.866 286.484c-1.385 49.516.348 99.377 5.193 111.495 4.848 12.118 15.223 35.688 50.9 28.045 29.806-6.39 40.651-18.756 45.357-46.05 3.466-20.083 10.148-75.855 11.005-87.282M173.104 38.256S11.583-27.76 19.092 122.366c1.597 31.937 45.779 241.663 98.473 178.315 19.256-23.166 36.671-41.335 36.671-41.335M260.349 26.207c-5.591 1.753 89.848-34.889 144.087 34.417 19.159 24.484-3.043 124.52-56.153 203.33" /><path d="M348.282 263.953s3.461 17.036 53.764 6.653c22.04-4.552 8.776 12.774-13.577 23.155-18.345 8.514-59.474 10.696-60.146-1.069-1.729-30.355 21.647-21.133 19.96-28.739-1.525-6.85-11.979-13.573-18.894-30.338-6.037-14.633-82.796-126.849 21.287-110.183 3.813-.789-27.146-99.002-124.553-100.599-97.385-1.597-94.19 119.762-94.19 119.762" stroke-linejoin="bevel" /><path d="M188.604 274.334c-13.577 15.166-9.584 17.83-36.723 23.417-27.459 5.66-11.326 15.733-.797 18.365 12.768 3.195 42.307 7.718 62.266-20.229 6.078-8.509-.036-22.086-8.385-25.547-4.034-1.67-9.428-3.765-16.361 3.994z" /><path d="M187.715 274.07c-1.368-8.918 2.93-19.529 7.536-31.943 6.922-18.626 22.893-37.255 10.117-96.339-9.523-44.029-73.396-9.163-73.436-3.193-.039 5.968 2.889 30.26-1.067 58.548-5.162 36.913 23.488 68.132 56.479 64.938" /><path d="M172.517 141.7c-.288 2.04 3.733 7.48 8.976 8.207 5.234.73 9.714-3.522 9.998-5.559.284-2.039-3.732-4.285-8.977-5.015-5.237-.73-9.719.333-9.996 2.367z" fill="#fff" stroke-width="4.155" stroke-linecap="butt" stroke-linejoin="miter" /><path d="M331.941 137.543c.284 2.04-3.732 7.48-8.976 8.207-5.238.73-9.718-3.522-10.005-5.559-.277-2.039 3.74-4.285 8.979-5.015 5.239-.73 9.718.333 10.002 2.368z" fill="#fff" stroke-width="2.078" stroke-linecap="butt" stroke-linejoin="miter" /><path d="M350.676 123.432c.863 15.994-3.445 26.888-3.988 43.914-.804 24.748 11.799 53.074-7.191 81.435" /></g></svg>
                    </span>
                </div>

                <div className='flex gap-4 items-center justify-around p-4 m-2 rounded-xl border border-blue-900'>
                    <div>
                        <span className='text-lg font-medium border-b-2 border-orange-300'>Frontend</span>
                        <ul className='list-disc px-4'>
                            <li>NEXT.js</li>
                            <li>TypeScript</li>
                            <li>Chart.js</li>
                            <li>TailwindCSS</li>
                        </ul>
                    </div>
                    <div>
                        <span className='text-lg font-medium border-b-2 border-orange-300'>Backend and DB</span>
                        <ul className='list-disc px-4'>
                            <li>NODE.js</li>
                            <li>TypeScript</li>
                            <li>Express.js</li>
                            <li>PostgreSQL</li>
                        </ul>
                    </div>
                </div>
                <h2 className='text-lg mb-2 font-semibold border-b-2 border-orange-500 w-fit'>User Authentication and Authorization</h2>
                <ol className='list-decimal px-4'>
                    <li className='font-medium'>Registration:</li>
                    <ul className='list-disc p-2'>
                        <li>Create a new account by providing a full name, email, password and confirm password.</li>
                        <li>Passwords are securely hashed for storage.</li>
                        <li>User is redirected to OTP input page to verify the email.</li>
                        <li> After OTP verification , user is set as verified email. It is able to access the main page without being verified but in order to add you data (expense data ) user must verify their email with OTP.</li>
                    </ul>
                    <li className='font-medium'>User Login and Authentication </li>
                    <ul className='list-disc p-2 '>
                        <li>Enter your username or email and password to log in.</li>
                        <li>Upon successful login, a JWT token is generated and stored in an local storage in the client side.</li>
                    </ul>
                    <li className='font-medium'>Authorization with JWT:</li>
                    <ul className='list-disc p-2'>
                        JWT tokens are used to verify the user identify for adding new expenses and fetching user informations for profile.

                    </ul>
                </ol>
                <h2 className='text-lg font-semibold mb-2 font-semibold border-b-2 border-orange-500 w-fit'>Expense Tracking Features</h2>
                <ol className='list-decimal px-4'>
                    <li className='font-medium'>Adding Expenses:</li>
                    <ul className='list-disc p-2'>
                        <li>Record new expenses, amount, category, and description.</li>
                        <li>Data is saved securely to the database.</li>
                    </ul>
                    <li className='font-medium'> Editing and Deleting Expenses:</li>
                    <ul className='list-disc p-2'>
                        <li>Modify existing expenses or remove them entirely.</li>
                        <li>Security measures are in place to prevent unauthorized modifications.</li>
                    </ul>
                    <li className='font-medium'>Categorization:</li>
                    <ul className='list-disc p-2'>
                        <li>Organize expenses using pre-defined or custom categories.</li>
                        <li>Categories help analyze and understand spending habits.</li>
                    </ul>
                    <li className='font-medium'>Filtering</li>
                    <ul className='list-disc p-2'>
                        <li>Filter expenses by date, category, or other criteria for focused analysis.</li>
                    </ul>
                </ol>
                <h2 className='text-lg font-semibold mb-2 font-semibold border-b-2 border-orange-500 w-fit'>Visualization and Analytics</h2>
                <ol className='list-decimal px-4'>
                    <li className='font-medium'>Expense Overviews:</li>
                    <ol className='list-disc p-2'>
                        <li>View daily, monthly, and yearly expense breakdowns for comprehensive insights.</li>
                        <li>Data is dynamically retrieved and presented in clear formats.</li>
                    </ol>
                    <li className='font-medium'>Charts and Graphs:</li>
                    <ol className='list-disc p-2'>
                        <li>Visualize expenses using bar charts, pie charts, line graphs, etc.</li>
                        <li>Charts help identify spending trends and areas for potential savings.</li>
                    </ol>
                </ol>
                <h2 className='text-lg font-semibold mb-2 font-bold border-b-2 border-orange-500 w-fit'>Conclusion</h2>
                <p>This expense tracker empowers you to take control of your finances. With its user-friendly interface, powerful visualization tools, and secure authentication, you can make informed spending decisions and achieve your financial goals.</p>
            </div>
            <footer className=' border-t border-gray-400 bg-gradient-to-t from-orange-200 via-gray-200 to-gray-200 px-2 py-4 mt-8 flex flex-col items-center dark:bg-gradient-to-t dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 '>
                <div className='text-gray-900 dark:text-gray-300 font-semibold'>
                    <h1 className='px-8 py-2'>Suggestions : </h1>
                    <div className='flex gap-2 md:flex-row flex-col items-center '>
                        <textarea
                            className='bg-gray-200 outline-none border-2 border-gray-500 rounded-lg px-2 w-4/5'
                            // value=""
                            // onChange={handleChange}
                            rows={4}
                            cols={40}
                            placeholder="Your suggestions for improvement here..."
                        />
                        <button className='w-1/5 bg-blue-600 text-white h-fit w-fit p-2 rounded active:bg-green-500 transition-all duration-300 ease text-sm'>Submit</button>
                    </div>
                </div>
                <span className='text-base font-medium pt-2 mb-2  border-b border-gray-600 text-gray-800 dark:text-gray-300'> Find me on </span>
                <ul className='flex gap-6 mx-auto w-full items-center justify-center  list-disc'>
                    <li className='hover:underline text-gray-700 dark:text-gray-400'><Link href={'https://stackoverflow.com/users/24161634/sudeepbogati'}> StackOverflow </Link></li>
                    <li className='hover:underline text-gray-700 dark:text-gray-400'><Link href={'https://github.com/sudeepbogati7'}>Github </Link></li>
                    <li className='hover:underline text-gray-700 dark:text-gray-400'><Link href={'https://linkedin.com/in/sudeep-bogati'}> LinkedIn </Link></li>
                    <li className='hover:underline text-gray-700 dark:text-gray-400'> <Link href={'https://www.instagram.com/the.sudeep_/'}> Instagram </Link></li>
                </ul>
            </footer>
        </>
    )
}