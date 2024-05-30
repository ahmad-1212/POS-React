import { IoSearchOutline } from 'react-icons/io5';
import Modal from '../../Components/UI/Modal';
import Button from '../../Components/UI/Button';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import IngredientForm from './IngredientForm';
import IngredientsTable from './IngredientsTable';

const Ingredients = () => {
  return (
    <section className="flex flex-col gap-8 py-10">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search here..."
          className="peer w-full rounded-3xl border-2 border-primary-200 bg-transparent px-5 py-2 outline-none placeholder:text-primary-200 focus:border-primary-300 md:w-1/2"
        />
        <IoSearchOutline className=" -ml-8 cursor-pointer text-[1.2rem] text-primary-200 peer-focus:text-primary-500" />
      </div>
      <div className="flex-between flex-wrap gap-3 border-b-2 border-primary-200/30 pb-5">
        <h1 className="text-[2rem] font-[600]">Ingredients</h1>
        <Modal>
          <Modal.Open id="addCategory">
            <Button variant="dark" className="flex items-center gap-3">
              <MdOutlineAddCircleOutline className="text-[1.3rem]" />
              <span>Add New</span>
            </Button>
          </Modal.Open>
          <Modal.Window
            id="addCategory"
            closeOnOverlay
            scrollbar={false}
            zIndex="z-50"
          >
            <IngredientForm />
          </Modal.Window>
        </Modal>
      </div>
      <IngredientsTable />
    </section>
  );
};

export default Ingredients;
