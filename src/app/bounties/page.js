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

import ListLayout from '#/entry/layouts/list';

import BountySlideSearch from './BountySlideSearch';
import { Container } from './Container';
import { ListSkeleton } from './ListSkeleton';

export default function Page({ params, searchParams }) {
  return (
    <ListLayout
      title="Bounties"
      description="Post and Discover Bounties with Payment Secured by OpenBuild Smart Contract."
      filter={<BountySlideSearch />}
      skeleton={<ListSkeleton />}
    >
      <Container type={params.type} searchParams={searchParams} />
    </ListLayout>
  );
}
