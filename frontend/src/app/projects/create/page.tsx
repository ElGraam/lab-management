// src/app/projects/create/page.tsx
import { getServerSession } from 'next-auth/next';
import { authOption } from '@/lib/next-auth/auth';
import { redirect } from 'next/navigation';
import ProjectCreateForm from './_components/ProjectCreateForm';
import { Box, Container } from '@chakra-ui/react';

const CreateProjectPage = async () => {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect('/auth/signin');
  }

  const labId = session.user.labId || '';

  return (
    <Container>
      <ProjectCreateForm labId={labId} />
    </Container>
  );
};

export default CreateProjectPage;