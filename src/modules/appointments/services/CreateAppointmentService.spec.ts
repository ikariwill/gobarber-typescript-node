import AppError from '@shared/errors/AppError';
import FakeAppointmentService from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentService = new FakeAppointmentService();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentService,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1212121',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1212121');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const fakeAppointmentService = new FakeAppointmentService();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentService,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1212121',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1212121',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
