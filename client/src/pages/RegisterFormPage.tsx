import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle, Plus, Trash2, UploadCloud, FileText } from 'lucide-react';
import { registerTeam } from '../services/api';
import { problems, domains } from '../data/problems';

type TeamMember = {
    name: string;
    email: string;
    phone: string;
};

type FormData = {
    fullName: string;
    email: string;
    phone: string;
    yearOfStudy: string;
    members: TeamMember[];
    preferredProblem: string;
    pptFile: FileList;
};

const RegisterFormPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDomain, setSelectedDomain] = useState('');

    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        defaultValues: { members: [] }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "members" });
    const pptFile = watch('pptFile');

    const filteredProblems = selectedDomain
        ? problems.filter(p => p.domain === selectedDomain)
        : problems;

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('fullName', data.fullName);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('yearOfStudy', data.yearOfStudy);
            formData.append('preferredProblem', data.preferredProblem);
            if (data.pptFile?.[0]) formData.append('pptFile', data.pptFile[0]);
            if (data.members?.length) formData.append('members', JSON.stringify(data.members));

            await registerTeam(formData);
            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed. Please check your details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-6 bg-black">
                <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-4">Registration Successful!</h1>
                    <p className="text-neutral-400 mb-8">We have received your registration. Check your email for further updates.</p>
                    <button onClick={() => window.location.href = '/'} className="btn-primary w-full">Go Back Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-40 px-6 max-w-3xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-2 font-outfit">Registration Form</h1>
                <p className="text-neutral-500 font-medium italic">Complete the form below to register your team.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 group">
                {/* Personal Info */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-2 font-outfit uppercase tracking-tight">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputBox label="Full Name">
                            <input {...register("fullName", { required: "Full Name is required" })} placeholder="Full Name" className={inputStyle(!!errors.fullName)} />
                            {errors.fullName && <FieldError message={errors.fullName.message} />}
                        </InputBox>
                        <InputBox label="Email Address">
                            <input {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} placeholder="Email Address" className={inputStyle(!!errors.email)} />
                            {errors.email && <FieldError message={errors.email.message} />}
                        </InputBox>
                        <InputBox label="Phone Number">
                            <input {...register("phone", { required: "Phone is required", pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" } })} placeholder="Phone Number" className={inputStyle(!!errors.phone)} />
                            {errors.phone && <FieldError message={errors.phone.message} />}
                        </InputBox>
                        <InputBox label="Year of Study">
                            <select {...register("yearOfStudy", { required: "Year is required" })} className={inputStyle(!!errors.yearOfStudy)}>
                                <option value="">Select Year</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                            {errors.yearOfStudy && <FieldError message={errors.yearOfStudy.message} />}
                        </InputBox>
                    </div>
                </div>

                {/* Team Members */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-2 font-outfit uppercase tracking-tight">Team Members (Max 4)</h3>
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <motion.div key={field.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl relative">
                                <button type="button" onClick={() => remove(index)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 p-2">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="text-xs font-bold text-neutral-600 mb-4 uppercase tracking-widest">Member {index + 1}</div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <input {...register(`members.${index}.name` as const, { required: "Name is required" })} placeholder="Name" className={inputStyle(!!errors.members?.[index]?.name)} />
                                        {errors.members?.[index]?.name && <FieldError message={errors.members[index].name?.message} />}
                                    </div>
                                    <div>
                                        <input {...register(`members.${index}.email` as const, { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })} placeholder="Email" className={inputStyle(!!errors.members?.[index]?.email)} />
                                        {errors.members?.[index]?.email && <FieldError message={errors.members[index].email?.message} />}
                                    </div>
                                    <div>
                                        <input {...register(`members.${index}.phone` as const, { required: "Phone is required", pattern: { value: /^[0-9]{10}$/, message: "Invalid phone" } })} placeholder="Phone" className={inputStyle(!!errors.members?.[index]?.phone)} />
                                        {errors.members?.[index]?.phone && <FieldError message={errors.members[index].phone?.message} />}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {fields.length < 4 && (
                            <button type="button" onClick={() => append({ name: '', email: '', phone: '' })} className="w-full py-4 border-2 border-dashed border-neutral-800 rounded-xl text-neutral-500 hover:border-neutral-700 hover:text-white transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                                <Plus className="w-4 h-4" /> Add Team Member
                            </button>
                        )}
                    </div>
                </div>

                {/* Problem Selection & File */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-2 font-outfit uppercase tracking-tight">Project Submission</h3>

                    <InputBox label="Filter by Domain (Optional)">
                        <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)} className={inputStyle(false)}>
                            <option value="">All Domains</option>
                            {domains.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </InputBox>

                    <InputBox label="Problem Statement ID (Select or Type)">
                        <input
                            list="problems-list"
                            {...register("preferredProblem", { required: "Please enter a problem statement ID" })}
                            placeholder="Type ID or search... (e.g., AGR-051)"
                            className={inputStyle(!!errors.preferredProblem)}
                        />
                        <datalist id="problems-list">
                            {filteredProblems.map(p => (
                                <option key={p.id} value={p.id}>{p.id} - {p.title}</option>
                            ))}
                        </datalist>
                        {errors.preferredProblem && <FieldError message={errors.preferredProblem.message} />}
                    </InputBox>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Project Presentation (PPT/PPTX)</label>
                        <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all ${errors.pptFile ? 'border-rose-500/30' : 'border-neutral-800 hover:border-neutral-700'}`}>
                            <div className="flex flex-col items-center justify-center text-center">
                                {pptFile?.[0] ? <FileText className="w-8 h-8 text-white mb-2" /> : <UploadCloud className="w-8 h-8 text-neutral-600 mb-2" />}
                                <p className="text-sm font-bold text-white underline underline-offset-4">{pptFile?.[0] ? pptFile[0].name : 'Browse Files'}</p>
                            </div>
                            <input type="file" className="hidden" accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" {...register("pptFile", { required: "Project presentation PPT is required" })} />
                        </label>
                        {errors.pptFile && <FieldError message={errors.pptFile.message} />}
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm font-medium flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" /> {error}
                    </div>
                )}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-5 text-xl rounded-xl flex items-center justify-center gap-3 disabled:opacity-50">
                    {isSubmitting ? (
                        <><Loader2 className="w-6 h-6 animate-spin" /> Registering...</>
                    ) : (
                        "Submit Registration"
                    )}
                </button>
            </form>
        </div>
    );
};

const InputBox = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="flex flex-col space-y-2">
        <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">{label}</label>
        {children}
    </div>
);

const FieldError = ({ message }: { message?: string }) => (
    <p className="text-xs text-rose-500 font-medium ml-1 mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> {message}
    </p>
);

const inputStyle = (err: boolean) => `
    w-full bg-neutral-950 border ${err ? 'border-rose-500' : 'border-neutral-800 focus:border-neutral-600'} 
    rounded-xl px-4 py-4 text-white placeholder:text-neutral-700 focus:outline-none transition-all font-medium
`;

export default RegisterFormPage;
