export default class CohortsManager {
  constructor() {
    this.cohorts = []
  }

  createCohort(cohortName) {
    const newCohort = new Cohort(cohortName)
    this.cohorts.push(newCohort)
  }

  removeCohort(cohortName) {
    const cohortToRemove = this.findCohort(cohortName)

    this.cohorts = this.cohorts.filter(
      (cohort) => cohort.name !== cohortToRemove.name
    )
  }

  findCohort(cohortName) {
    const cohort = this.cohorts.find((cohort) => cohort.name === cohortName)

    if (cohort instanceof Cohort === false)
      throw new Error(this.getErrorMessage(cohortName))

    return cohort
  }

  addStudent(cohortName, student) {
    const cohort = this.findCohort(cohortName)

    if (cohort instanceof Cohort === false)
      throw new Error(this.getErrorMessage(cohortName))

    cohort.addStudent(student)
  }

  removeStudent(cohortName, studentId) {
    const cohort = this.findCohort(cohortName)

    return cohort.removeStudent(studentId)
  }

  getErrorMessage(cohortName) {
    return `The ${cohortName} cohort is not found!`
  }
}

export class Cohort {
  constructor(name) {
    this.name = name
    this.students = []
  }

  addStudent(student) {
    this.students.push(student)
  }

  removeStudent(studentId) {
    const studentToRemove = this.students.find(
      (student) => student.id === studentId
    )

    this.students = this.students.filter(
      (student) => student.id !== studentToRemove.id
    )
  }
}

export class Student {
  constructor(firstName, lastName, github, email) {
    this.id = this.createId(firstName, lastName, github)
    this.firstName = firstName
    this.lastName = lastName
    this.github = github
    this.email = email
  }

  createId(firstName, lastName, github) {
    const initials = firstName[0]?.toLowerCase() + lastName[0]?.toLowerCase()

    return initials + '-' + github
  }
}
