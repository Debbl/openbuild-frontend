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

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { isBlockDataValid } from '@/components/block-editor';
import useAppConfig from '@/hooks/useAppConfig';
import useMounted from '@/hooks/useMounted';

import { useViewingSelf } from '../../../auth/hooks';
import PublishedBountyListView from '../../../bounty/views/published-bounty-list';
import PublishedChallengeListView from '../../../challenge/views/published-challenge-list';
import PublishedCourseListView from '../../../course/views/published-course-list';
import PublishedQuizListView from '../../../quiz/views/published-quiz-list';
import { fetchBlockContent, updateBlockContent } from '../../repository';
import ActivityTabListWidget from '../../widgets/activity-tab-list';
import SocialInfoWidget from '../../widgets/social-info';
import TabBarWidget from '../../widgets/tab-bar';
import CustomContent from './CustomContent';
import LatestActivityList from './LatestActivityList';

function resolveTabs(published) {
  return [
    {
      text: 'Open Course',
      node: (
        <>
          <span className="inline md:hidden">Courses</span>
          <span className="hidden md:inline">Open Course ({published?.open_course_num ?? 0})</span>
        </>
      ),
      view: PublishedCourseListView,
    },
    {
      text: 'Challenges',
      node: (
        <>
          <span className="inline md:hidden">Challenge</span>
          <span className="hidden md:inline">Challenges ({published?.challenge_num ?? 0})</span>
        </>
      ),
      view: PublishedChallengeListView,
    },
    {
      text: 'Bounty',
      node: (
        <>
          <span className="inline md:hidden">Bounty</span>
          <span className="hidden md:inline">Bounty ({published?.bounty_num ?? 0})</span>
        </>
      ),
      view: PublishedBountyListView,
    },
    {
      text: 'Quiz',
      node: (
        <>
          <span className="inline md:hidden">Quiz</span>
          <span className="hidden md:inline">Quiz ({published?.quiz_num ?? 0})</span>
        </>
      ),
      view: PublishedQuizListView,
    },
  ];
};

function TeamProfileView({ data, activities }) {
  const [tabActive, setTabActive] = useState(1);
  const [blockContent, setBlockContent] = useState(null);
  const viewingSelf = useViewingSelf(data?.base.user_id);
  const devPlazaEnabled = useAppConfig('devPlaza.enabled');

  useMounted(() => {
    devPlazaEnabled &&
      fetchBlockContent(data?.base.user_id).then(res => {
        if (res.success) {
          setBlockContent(res.data);
        }
      });
  });

  const handleBlockChange = useDebouncedCallback(updateBlockContent, 3000);

  const tabContent = [
    <SocialInfoWidget key="social" data={data} />,
    <LatestActivityList key="activity" activities={activities} />,
  ];

  const rerenderKey = [
    'CustomContent',
    `${viewingSelf ? 'editable' : 'readonly'}`,
    isBlockDataValid(blockContent),
  ].join('-');

  return (
    <div className="md:pl-[410px] md:pb-14 md:pr-14">
      {devPlazaEnabled && (
        <CustomContent
          key={rerenderKey}
          className="mb-6"
          data={blockContent}
          onChange={handleBlockChange}
          editable={viewingSelf}
        />
      )}
      <TabBarWidget
        tabs={['Info', 'Activities']}
        tabClassName="h-14 md:h-9 md:w-[111px] md:first:hidden"
        current={tabActive}
        onChange={setTabActive}
      />
      {tabContent[tabActive]}
      <ActivityTabListWidget userId={data?.base.user_id} tabs={resolveTabs(data?.num)} />
    </div>
  );
}

export default TeamProfileView;
