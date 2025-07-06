// components/LandmarkField.tsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'; // Adjust according to your form library
import { Input } from '@/components/ui/input'; // Adjust according to your input component
import { Button } from '@/components/ui/button';

interface LandmarkFieldProps {
    control: any;
    index: number;
    onDelete: (index: number) => void; // Delete function passed from parent
}

const LandmarkField = ({ control, index, onDelete }: LandmarkFieldProps) => {
    return (
        <>
            <FormField
                control={control}
                name={`landmarks.${index}.name`} // Access the name of the landmark at the given index
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Landmark Name</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                required
                                placeholder="Name"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`landmarks.${index}.distance`} // Access the distance of the landmark at the given index
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Landmark Distance</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                required
                                placeholder="Distance"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`landmarks.${index}.type`} // Access the type of the landmark at the given index
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Landmark Type</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                required
                                placeholder="Type"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Delete button */}
            <Button type="button" onClick={() => onDelete(index)}>
                Delete Landmark
            </Button>
        </>
    );
};

export default LandmarkField;
