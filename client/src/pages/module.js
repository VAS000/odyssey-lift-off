import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Layout, QueryResult, ModuleDetail } from '../components';

const MODULE_AND_PARENT_TRACK_QUERY = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

const Module = ({ moduleId, trackId }) => {
  const { data, error, loading } = useQuery(MODULE_AND_PARENT_TRACK_QUERY, {
    variables: { moduleId, trackId },
  });
  return (
    <Layout fullWidth>
      <QueryResult data={data} error={error} loading={loading}>
        <ModuleDetail module={data?.module} track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
