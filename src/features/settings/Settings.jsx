import { MdDeleteForever, MdOutlineAddCircleOutline } from 'react-icons/md';
import Button from '../../Components/UI/Button';
import Modal from '../../Components/UI/Modal';
import UserForm from './UserForm';
import IconButton from '../../Components/UI/IconButton';
import { ImPen } from 'react-icons/im';
import ConfirmDelete from '../../Components/UI/ConfirmDelete';

const USERS = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@example.com',
    role: 'manager',
  },
  {
    id: 2,
    name: 'User 2',
    email: 'user2@example.com',
    role: 'manager',
  },
  {
    id: 3,
    name: 'User 3',
    email: 'user3@example.com',
    role: 'manager',
  },
  {
    id: 4,
    name: 'User 4',
    email: 'user4@example.com',
    role: 'kitchen staff',
  },
  {
    id: 5,
    name: 'User 5',
    email: 'user5@example.com',
    role: 'kitchen staff',
  },
  {
    id: 6,
    name: 'User 6',
    email: 'user6@example.com',
    role: 'kitchen staff',
  },
  {
    id: 7,
    name: 'User 7',
    email: 'user7@example.com',
    role: 'cashier',
  },
  {
    id: 8,
    name: 'User 8',
    email: 'user8@example.com',
    role: 'cashier',
  },
  {
    id: 9,
    name: 'User 9',
    email: 'user9@example.com',
    role: 'cashier',
  },
  {
    id: 10,
    name: 'User 10',
    email: 'user10@example.com',
    role: 'cashier',
  },
];

const Settings = () => {
  return (
    <section className="flex flex-col gap-8 py-10">
      <div className="flex-between flex-wrap gap-3 border-b-2 border-primary-100 pb-5">
        <h1 className="text-[2rem] font-[600]">Settings</h1>
        <Modal>
          <Modal.Open id="newUser">
            <Button variant="dark" className="flex items-center gap-3">
              <MdOutlineAddCircleOutline className="text-[1.3rem]" />
              <span>Add New User</span>
            </Button>
          </Modal.Open>
          <Modal.Window id="newUser" zIndex="z-50" closeOnOverlay>
            <UserForm />
          </Modal.Window>
        </Modal>
      </div>
      <div>
        <h2 className="mb-3 text-[1.5rem] font-[600]">Users</h2>
        <div
          className="custom-scrollbar w-full border-2 border-primary-100"
          style={{ minWidth: '98%', overflowX: 'auto' }}
        >
          <table className="w-full rounded-lg border-2 border-primary-100">
            <thead className="bg-primary-100 text-[1.2rem] text-primary-500">
              <tr>
                <th className="w-max py-3">User Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Role</th>
                <th className="py-3">Edit</th>
                <th className="py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((usr, i) => (
                <Modal key={usr.id}>
                  <tr
                    className={`border-2 border-primary-100 text-center ${
                      i % 2 !== 0 ? 'bg-primary-100/50' : 'bg-white'
                    }`}
                  >
                    <td className="w-max px-3 py-2">{usr.name}</td>
                    <td className="px-3 py-2">{usr.email}</td>
                    <td className="px-3 py-2">{usr.role}</td>
                    <td className="w-[6%] px-3 py-2 font-[600] text-primary-500">
                      <Modal.Open id="editUser">
                        <IconButton
                          className={`text-[1.3rem] text-primary-500 ${
                            i % 2 !== 0 ? 'hover:bg-primary-200' : ''
                          }`}
                        >
                          <ImPen />
                        </IconButton>
                      </Modal.Open>
                      <Modal.Window id="editUser" closeOnOverlay zIndex="z-50">
                        <UserForm edit user={usr} />
                      </Modal.Window>
                    </td>
                    <td className="py-2 font-[600] text-primary-500">
                      <Modal.Open id="deleteUser">
                        <IconButton className="text-[1.3rem] text-red-500 hover:bg-red-200">
                          <MdDeleteForever />
                        </IconButton>
                      </Modal.Open>
                      <Modal.Window
                        id="deleteUser"
                        center
                        closeOnOverlay
                        zIndex="z-50"
                      >
                        <ConfirmDelete
                          onConfirm={() => {}}
                          message="Are you sure you want to delete this User?"
                          successMessage={`User successfully Deleted!`}
                        />
                      </Modal.Window>
                    </td>
                  </tr>
                </Modal>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Settings;
