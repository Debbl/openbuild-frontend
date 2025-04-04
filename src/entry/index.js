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

import { AppConfigContext } from '@/hooks/useAppConfig';

import { ReduxProviders } from '#/state/provider';

import setInterceptorsForHttpClients from './aspects/http';
import DifyWidget from './components/DifyWidget';
import { Providers } from './components/Providers';
import { RouteIntercept } from './components/RouteIntercept';
import { RouterProgress } from './components/RouterProgress';
import { Toast } from './components/Toast';

setInterceptorsForHttpClients();

function ClientEntry({ config, children }) {
  return (
    <Providers>
      <AppConfigContext.Provider value={config.static}>
        <RouterProgress>
          <Toast />
          <ReduxProviders datas={{ configs: config.dynamic }}>
            {children}
            <RouteIntercept />
          </ReduxProviders>
        </RouterProgress>
        <DifyWidget />
      </AppConfigContext.Provider>
    </Providers>
  );
}

export default ClientEntry;
