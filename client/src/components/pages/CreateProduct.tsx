import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StepOne = ({ onNext }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            name: "",
            price: "",
        },
    });
    const onSubmit = (data) => {
        onNext(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
                <label htmlFor="productName" className="form-label">Product name</label>
                <input type="text" className="form-control" id="productName" aria-describedby="emailHelp"
                    {...register("name", {
                        maxLength: {
                            value: 30,
                            message: "Product name is too long",
                        },
                        required: {
                            value: true,
                            message: "Product name is required",
                        },
                    })} />
                {errors.name && <span style={{color: "red"}}>{errors.name.message}</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" className="form-control"
                    {...register("price", {
                        required: {
                            value: true,
                            message: "Price is required",
                        }
                    })} />
                {errors.price && <span style={{color: "red"}}>{errors.price.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Next</button>
        </form>
    );
}

const StepTwo = ({ onNext }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            description: "",
            category: "",
        },
    });

    const onSubmit = (data) => {
        onNext(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Product description</label>
                <input type="text" className="form-control"
                    {...register("description", {
                        maxLength: {
                            value: 90,
                            message: "Product description is too long",
                        },
                        required: {
                            value: true,
                            message: "Product description is required",
                        },
                    })} />
                {errors.description && <span style={{color: "red"}}>{errors.description.message}</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Product category</label>
                <select {...register("category", { required: { value: true, message: "Category is required" } })}
                    className="form-select" aria-label="Category selector">
                    <option value="Вироби з каменю">Вироби з каменю</option>
                    <option value="Вироби з деревини">Вироби з деревини</option>
                    <option value="Товари для офісу">Товари для офісу</option>
                    <option value="Вироби зі скла">Вироби зі скла</option>
                </select>
                {errors.category && <span style={{color: "red"}}>{errors.category.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Next</button>
        </form>
    );
}

const StepThree = ({ data, onSubmit }) => {

    console.log(data);

    return (
        <>
            <label className="form-label">Category: {data.category}</label>
            <label className="form-label">Name: {data.name}</label>
            <label className="form-label">Price: {Number(data.price) / 100}$</label>
            <label className="form-label">Description: {data.description}</label>

            <button type="submit" className="btn btn-primary" onClick={onSubmit}>Add</button>
        </>
    );
}

function CreateProduct() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const navigate =useNavigate();

    const onNext = (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
        setStep((prevStep) => prevStep + 1);
    }

    const onSubmit = async () => {
        const categoryID = await getCategoryID(formData.category);
        const finalData = { ...formData, category: categoryID };
        axios.post("http://localhost:3000/products", finalData);
        navigate('/');
    }

    const getCategoryID = async (categoryName) => {
        try {
            const categoriesResponse = await axios.get("http://localhost:3000/categories");
            const categories = categoriesResponse.data;
            const category = categories.find(cat => cat.name === categoryName);
            return category ? category.id : null;
        } catch (e) {
            console.log(e);
        }
    }

    const renderState = () => {
        switch (step) {
            case 1:
                return <StepOne onNext={onNext} />;
            case 2:
                return <StepTwo onNext={onNext} />;
            case 3:
                return <StepThree onSubmit={onSubmit} data={formData} />;
            default:
                return null;
        }
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="row justify-content-center">
                        <div className="col-6"></div>
                        {renderState()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProduct;
