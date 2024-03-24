import random
from datetime import datetime


# Helper function in your views or a utilities module
def format_for_ga(classes, subjects, teachers, divisions, schedule_params):
    # Formatting Classes
    formatted_classes = [{'classname': cls.classname, 'class_type': cls.classType} for cls in classes]

    # Formatting Subjects
    formatted_subjects = [{
        'subjectname': subj.subjectname,
        'credit': subj.credit,
        'length': subj.length,
        'type': subj.type
    } for subj in subjects]

    # Formatting Teachers
    formatted_teachers = [{'teachername': teacher.teachername, 'subjects': teacher.subjects} for teacher in teachers]

    # Formatting Divisions
    formatted_divisions = [{
        'divisionname': div.divisionname,
        'subdivisions': div.subdivisions,
        'subjects': div.subjects
    } for div in divisions]


    # Formatting Schedule Params
    formatted_schedule_params = {
    'days': schedule_params.days,  # Ensure this is a list [Monday, Tuesday, ...]
    'start_times': [datetime.strptime(start_time, "%H:%M") for start_time in schedule_params.start_times],
    'end_times': [datetime.strptime(end_time, "%H:%M") for end_time in schedule_params.end_times],
    'break_start_time': schedule_params.break_start_time,
    'break_end_time': schedule_params.break_end_time,
}
 

    return {
        'classes': formatted_classes,
        'subjects': formatted_subjects,
        'teachers': formatted_teachers,
        'divisions': formatted_divisions,
        'schedule_params': formatted_schedule_params
    }

# # Constants for the GA, these should be tuned to your problem.
# POPULATION_SIZE = 100
# NUM_GENERATIONS = 1000
# CROSSOVER_PROBABILITY = 0.8
# MUTATION_PROBABILITY = 0.2


# # Generate Initial Population
# def initialize_population(input_data):
#     # Create an initial population of timetables based on input_data
#     population = []
#     for _ in range(POPULATION_SIZE):
#         # Create a timetable instance
#         # This is highly dependent on your implementation of the timetable
#         timetable = create_random_timetable(input_data)
#         population.append(timetable)
#     return population



# def evaluate_fitness(timetable):
#     # A dummy example
#     conflicts = count_conflicts(timetable)
#     fitness = 100 - conflicts  # For simplicity: the fewer conflicts, the better
#     return fitness

# def crossover(parent1, parent2):
#     # You'll need a domain-specific crossover operator
#     # Here's a placeholder for the concept
#     child = {}
#     for key in parent1:
#         if random.random() < CROSSOVER_PROBABILITY:
#             child[key] = parent1[key]  # Inherit from parent 1
#         else:
#             child[key] = parent2[key]  # Inherit from parent 2
#     return child

# def mutate(timetable):
#     # Again, you need a domain-specific mutation operator
#     if random.random() < MUTATION_PROBABILITY:
#         # Implement mutation logic
#         pass
#     return timetable

# def select_parents(population_sorted):
#     # Implement your selection strategy (roulette wheel, tournament, etc.)
#     return parent1, parent2

# def stopping_condition_met(best_solution):
#     # Define and implement a stopping condition for your algorithm.
#     # For example, if the fitness score doesn't improve for a certain number of generations.
#     return False

# def best_solution_to_output_format(best_solution):
#     # Convert the best solution (internal representation) to the desired output format
#     return formatted_timetable

def create_time_slots(start_times, end_times):
    # Pair start and end times to create time slots
    return list(zip(start_times, end_times))

def get_available_teachers_for_subject(teachers, subject_name):
    # Filter teachers who can teach the subject
    return [t for t in teachers if subject_name in t['subjects']]

def get_compatible_class(classes, subject_type):
    # Return a class based on the type of the subject (Lab or Lecture/Tutorial)
    class_type = 'Lab' if subject_type == 'Lab' else 'Class'
    compatible_classes = [c for c in classes if c['class_type'] == class_type]
    return random.choice(compatible_classes) if compatible_classes else None

def find_continuous_slots(time_slots, length):
    # Helper function to find continuous time slots for subjects needing more than one session

    for i in range(len(time_slots) - (length - 1)):
        is_continuous = all(
            time_slots[i + j][1] == time_slots[i + j + 1][0]
            for j in range(length - 1)
        )
        if is_continuous:
            return time_slots[i:i + length]
    return None

def create_random_timetable(input_data):
    classes = input_data['classes']
    subjects = input_data['subjects']
    teachers = input_data['teachers']
    divisions = input_data['divisions']
    schedule_params = input_data['schedule_params']
        
    days = schedule_params['days']
    random_timetable = {}

    division_subject_credits = {}
    for division in divisions:
        division_name = division['divisionname']

        division_subjects = division['subjects']  # This should be a list of subject names
        division_subject_credits[division_name] = {}
        
        # Loop through each subject in the division and set its credit
        for subject_name in division_subjects:
            # Find the corresponding subject in the global subjects list and get its credit

            subject_credits = next(
                (subj['credit'] for subj in subjects if subj['subjectname'] == subject_name),0  # Default to 0 credits if subject is not found in the global list; you may also choose to handle this differently
            )

            division_subject_credits[division_name][subject_name] = subject_credits
        

    for division in divisions:
        division_name = division['divisionname']
        division_subjects = division['subjects']


        for day in days:
            time_slots = create_time_slots(schedule_params['start_times'],schedule_params['end_times'])
            print(time_slots)

            for start_time, end_time in time_slots:
                # Filter subjects for the division that still have weekly credits
                possible_subjects = [subject for subject in division_subjects
                                     if division_subject_credits[division_name][subject] > 0]
                print(possible_subjects)
                
         
                if not possible_subjects:
                    # No subjects left with credits for this day

                    continue

                selected_subject = [subject for subject in subjects if subject['subjectname'] ==  random.choice(possible_subjects)]
                print(selected_subject)

                if not selected_subject:
                    # No subjects left with credits for this day
                    continue


                if selected_subject[0]['length'] > 1:
                    # Find time slots for subjects that require more than one session (continuous)
                    continuous_slots = find_continuous_slots(time_slots, selected_subject[0]['length'])
                    print(continuous_slots)

                    
                    if not continuous_slots:
                        continue  # Can't find continuous slots, try the next subject
                    # Use the first slot as the start time
                    start_time = continuous_slots[0][0]

                    # Use the last slot's end time
                    end_time = continuous_slots[-1][1]


                # Filter teachers for the selected subject
                subject_teachers = [teacher for teacher in teachers
                                    if selected_subject[0]['subjectname'] in teacher['subjects']]
                print(subject_teachers)
                

                if not subject_teachers:
                    continue  # No teachers available for the subject

                selected_class = get_compatible_class(classes, selected_subject[0]['type'])
                print(selected_class)


                if not selected_class:
                    continue


                selected_teacher = random.choice(subject_teachers)
                print(selected_teacher)



                random_timetable[(division_name, day, start_time, end_time)] = {
                    'classname': selected_class['classname'],
                    'subjectname': selected_subject[0]['subjectname'],
                    'teachername': selected_teacher['teachername']
                }
                print("Workifjjkl")



                # Register the credit consumption for scheduled subject
                division_subject_credits[division_name][selected_subject[0]['subjectname']] -= 1

                # Remove time slots occupied by the current subject (if using multiple slots)
                if selected_subject[0]['length'] > 1:
                    for slot in continuous_slots:
                        time_slots.remove(slot)
                print("Workifjjkl")

            
    return random_timetable


# def count_conflicts(timetable):
#     # Implement a function to count conflicts in the timetable
#     return num_conflicts

# def evaluate_fitness(timetable):
#     # Define how to evaluate the fitness of a timetable
#     # It might include checks for conflicts, breaks, teacher availability, etc.
#     # Higher fitness values should correspond to better timetables
#     return fitness_score

# def crossover(parent1, parent2):
#     # Define the crossover strategy between two timetables
#     return child_timetable

# def mutate(timetable):
#     # Apply mutation to the timetable to introduce new solutions
#     return mutated_timetable

# def select_parents(population):
#     # Implement a selection process for choosing parents for the next generation
#     return selected_parent_timetables

# def generate_time_table_ga(input_data):
#     # Initialize population with random timetables
#     population = initialize_population(input_data)
#     best_solution = None
#     fitness_scores = []

#     for generation in range(NUM_GENERATIONS):
#         # Evaluate fitness for each timetable
#         for timetable in population:
#             fitness = evaluate_fitness(timetable)
#             fitness_scores.append((timetable, fitness))

#         # Sort population based on fitness
#         population_sorted = sorted(fitness_scores, key=lambda x: x[1], reverse=True)
#         if not best_solution or population_sorted[0][1] > evaluate_fitness(best_solution):
#             best_solution = population_sorted[0][0]

#         # Selection, Crossover and Mutation to create the new population
#         new_population = []
#         while len(new_population) < POPULATION_SIZE:
#             parent1, parent2 = select_parents(population_sorted)
#             child = crossover(parent1, parent2)
#             child = mutate(child)
#             new_population.append(child)

#         population = new_population

#         if stopping_condition_met(best_solution):
#             break

#     return best_solution_to_output_format(best_solution)
