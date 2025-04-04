/**
 * Copyright 2024 OpenBuild
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

import Image from 'next/image';
import BotFoundPic from 'public/images/svg/404.svg';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src={BotFoundPic} alt="" />
      <p className="mt-6 opacity-60">404</p>
    </div>
  );
}
