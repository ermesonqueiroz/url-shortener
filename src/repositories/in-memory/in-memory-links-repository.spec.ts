import { LinkData } from '../../entities/link/link-data';
import { InMemoryLinkRepository } from './in-memory-links-repository';

describe('In memory Links repository', () => {
  it('should add link', async () => {
    const links: LinkData[] = [];
    const stu = new InMemoryLinkRepository(links);
    await stu.add({
      id: 'Z5XEhf66',
      target: 'https://github.com/ermesonqueiroz',
      accessCount: 0,
      createdAt: new Date(),
    });
    const link = await stu.findLinkById('Z5XEhf66');
    expect(link?.id).toEqual('Z5XEhf66');
  });

  it('should not add link if link already exists', async () => {
    const links: LinkData[] = [{
      id: 'Z5XEhf66',
      target: 'https://github.com/',
      accessCount: 0,
      createdAt: new Date(),
    }];
    const stu = new InMemoryLinkRepository(links);
    await stu.add({
      id: 'Z5XEhf66',
      target: 'https://github.com/ermesonqueiroz',
      accessCount: 0,
      createdAt: new Date(),
    });
    const link = await stu.findLinkById('Z5XEhf66');
    expect(link?.target).toEqual('https://github.com/');
  });

  it('should return link if link is found', async () => {
    const links: LinkData[] = [{
      id: 'Z5XEhf66',
      target: 'https://github.com/ermesonqueiroz',
      accessCount: 0,
      createdAt: new Date(),
    }];
    const stu = new InMemoryLinkRepository(links);
    const link = await stu.findLinkById('Z5XEhf66');
    expect(link?.id).toEqual('Z5XEhf66');
  });

  it('should return null if link is not found', async () => {
    const links: LinkData[] = [];
    const stu = new InMemoryLinkRepository(links);
    const link = await stu.findLinkById('Z5XEhf66');
    expect(link).toEqual(null);
  });

  it('should return true if link is found', async () => {
    const links: LinkData[] = [{
      id: 'Z5XEhf66',
      target: 'https://github.com/ermesonqueiroz',
      accessCount: 0,
      createdAt: new Date(),
    }];
    const stu = new InMemoryLinkRepository(links);
    const link = await stu.exists('Z5XEhf66');
    expect(link).toBeTruthy();
  });

  it('should return false if link is not found', async () => {
    const links: LinkData[] = [];
    const stu = new InMemoryLinkRepository(links);
    const link = await stu.exists('Z5XEhf66');
    expect(link).toBeFalsy();
  });

  it('should update link if is found', async () => {
    const createdAt = new Date();
    const links: LinkData[] = [{
      id: 'Z5XEhf66',
      target: 'https://github.com/',
      accessCount: 0,
      createdAt,
    }];
    const stu = new InMemoryLinkRepository(links);
    await stu.update('Z5XEhf66', {
      id: 'Z5XEhf66',
      target: 'https://github.com/ermesonqueiroz',
      accessCount: 0,
      createdAt,
    });
    const link = await stu.findLinkById('Z5XEhf66');
    expect(link?.target).toEqual('https://github.com/ermesonqueiroz');
  });

  it('should not update link if is not found', async () => {
    const createdAt = new Date();
    const links: LinkData[] = [{
      id: 'Z5XEhf66',
      target: 'https://github.com/',
      accessCount: 0,
      createdAt,
    }];
    const stu = new InMemoryLinkRepository(links);
    await stu.update('XXXXXXXX', {
      id: 'Z5XEhf66',
      target: 'https://github.com/ermesonqueiroz',
      accessCount: 0,
      createdAt,
    });
    const link = await stu.findLinkById('Z5XEhf66');
    expect(link?.target).toEqual('https://github.com/');
  });
});
