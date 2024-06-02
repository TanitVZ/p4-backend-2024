import { getSociById } from '../src/controller';
import type { Request, Response , NextFunction } from 'express';
import { expect, describe, vi, beforeEach, it } from 'vitest';
import db from '../src/__mocks__/db';

const sociData = {
  nom: 'Arnau',
  cognoms: 'Valls Bermúdez',
  dni: '55078681Y',
  email: 'arnau.mer@gmail.com',
  actiu: true,
  dataAlta: new Date()
};

vi.mock('../src/db');

describe('getSociById success', () => {
  let res: Response;
  let next :  NextFunction

  beforeEach(() => {
    vi.resetAllMocks();
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response 
    next = vi.fn() as unknown as NextFunction ;
 
  });



 


  it('retorna el soci si existeix', async () => {
    db.soci.findUniqueOrThrow.mockResolvedValueOnce({ ...sociData, sociId: 2 });

    const mockRequest = {
      params: {
        id: '2',
      },
      body: {
        firstName: 'J',
        lastName: 'Doe',
        email: 'jdoe@abc123.com',
        password: 'Abcd1234',
        passwordConfirm: 'Abcd1234',
        company: 'ABC Inc.',
      }, 
    } as unknown as Request;
 
    const soci = await getSociById(mockRequest, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ...sociData, sociId: 2 });
   // expect(soci).toStrictEqual({ ...sociData, sociId: 1 });
  });

  /*
  it('retorna error si el soci no existeix', async () => {
    db.soci.findUniqueOrThrow.mockRejectedValueOnce(new Error ('Not Found'))

    const mockRequest = {
      params: {
        id: '70',
      }, 
    } as unknown as Request;
 
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    await expect(getSociById(mockRequest, res, next)).rejects.toThrowError(`Not found`)
   // expect(res.status).toHaveBeenCalledWith(404);
   // expect(res.json).toHaveBeenCalledWith({ ...sociData, sociId: 70 });
    //expect(soci).toStrictEqual({ ...sociData, sociId: 1 });
  });
*/
}); 
